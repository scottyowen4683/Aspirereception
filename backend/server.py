from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
import os, uuid, logging
from datetime import datetime

from emails import send_contact_notification, EmailDeliveryError

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'app_db')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    status: str
    message: str
    id: str

@api_router.get("/")
async def root():
    return {"message": "Aspire Executive Solutions API"}

@api_router.post("/contact", response_model=ContactResponse)
async def create_contact_submission(input: ContactSubmissionCreate, background_tasks: BackgroundTasks):
    try:
        contact_obj = ContactSubmission(**input.dict())
        await db.contact_submissions.insert_one(contact_obj.dict())
        background_tasks.add_task(
            send_contact_notification,
            contact_obj.name,
            contact_obj.email,
            contact_obj.phone or "",
            contact_obj.message
        )
        return ContactResponse(status="success",
                               message="Thank you for contacting us. We'll get back to you within 24 hours.",
                               id=contact_obj.id)
    except EmailDeliveryError as e:
        logging.error(f"Email delivery failed: {str(e)}")
        return ContactResponse(status="success",
                               message="Thank you for contacting us. We'll get back to you within 24 hours.",
                               id=contact_obj.id)
    except Exception as e:
        logging.exception("Error processing contact submission")
        raise HTTPException(status_code=500, detail="An error occurred processing your request")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
