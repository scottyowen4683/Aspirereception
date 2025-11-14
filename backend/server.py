from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
import os, uuid, logging, json
from datetime import datetime

from emails import (
    send_contact_notification,
    EmailDeliveryError,
    send_council_request_email,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# --- DB setup ---
mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
db_name = os.environ.get("DB_NAME", "app_db")
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# --- App / Router ---
app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- Models ---
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

# --- Health/info ---
@api_router.get("/")
async def root():
    return {"message": "Aspire Executive Solutions API"}

# --- Contact form route ---
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact_submission(
    input: ContactSubmissionCreate, background_tasks: BackgroundTasks
):
    try:
        contact_obj = ContactSubmission(**input.dict())
        await db.contact_submissions.insert_one(contact_obj.dict())

        background_tasks.add_task(
            send_contact_notification,
            contact_obj.name,
            contact_obj.email,
            contact_obj.phone or "",
            contact_obj.message,
        )

        return ContactResponse(
            status="success",
            message="Thank you for contacting us. We'll get back to you within 24 hours.",
            id=contact_obj.id,
        )

    except EmailDeliveryError as e:
        logging.error(f"Email delivery failed (background): {str(e)}")
        return ContactResponse(
            status="success",
            message="Thank you for contacting us. We'll get back to you within 24 hours.",
            id=contact_obj.id,
        )
    except Exception as e:
        logging.exception("Error processing contact submission")
        raise HTTPException(
            status_code=500, detail="An error occurred processing your request"
        )

# --- Debug ENV route ---
@api_router.get("/debug/env")
def debug_env():
    def mask(v: Optional[str]):
        if not v:
            return None
        return v[:4] + "..." + v[-4:] if len(v) > 8 else v

    return {
        "BREVO_API_KEY_set": bool(os.getenv("BREVO_API_KEY")),
        "BREVO_PASSWORD_set": bool(os.getenv("BREVO_PASSWORD")),
        "SENDER_EMAIL": os.getenv("SENDER_EMAIL"),
        "RECIPIENT_EMAIL": os.getenv("RECIPIENT_EMAIL"),
        "BREVO_API_KEY_preview": mask(
            os.getenv("BREVO_API_KEY") or os.getenv("BREVO_PASSWORD")
        ),
    }

# --- Contact debug route ---
@api_router.post("/contact/debug", response_model=ContactResponse)
async def create_contact_submission_debug(input: ContactSubmissionCreate):
    try:
        contact_obj = ContactSubmission(**input.dict())
        await db.contact_submissions.insert_one(contact_obj.dict())

        send_contact_notification(
            contact_obj.name,
            contact_obj.email,
            contact_obj.phone or "",
            contact_obj.message,
        )

        return ContactResponse(
            status="success",
            message="Email sent (debug route).",
            id=contact_obj.id,
        )

    except EmailDeliveryError as e:
        raise HTTPException(
            status_code=502, detail=f"Email delivery failed: {str(e)}"
        )
    except Exception as e:
        logging.exception("Debug route failed")
        raise HTTPException(status_code=500, detail=str(e))

# --- Vapi structured email endpoint ---
@api_router.post("/vapi/send-structured-email")
async def vapi_send_structured_email(request: Request):
    """
    Endpoint hit by the Vapi tool `send_structured_email_hinchinbrook`.

    Vapi wraps tool calls in a `message` envelope; we unwrap that and
    extract the function arguments as the actual email payload, AND we
    return the result in the exact structure Vapi expects:

    {
      "results": [
        {
          "toolCallId": "<id from toolCalls>",
          "result": "Your response as single-line string"
        }
      ]
    }
    """
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    logging.info(f"VAPI structured email RAW payload: {payload}")

    args = payload
    tool_call_id = None

    # --- Unwrap Vapi envelope to get toolCallId + arguments ---
    try:
        message = payload.get("message")
        if isinstance(message, dict):
            tool_calls = message.get("toolCalls") or message.get("toolCallList")
            if isinstance(tool_calls, list) and tool_calls:
                first_call = tool_calls[0]

                # toolCallId Vapi wants back
                tool_call_id = first_call.get("id")

                func = first_call.get("function", {})
                arguments = func.get("arguments")
                if isinstance(arguments, dict):
                    args = arguments
                elif isinstance(arguments, str):
                    # Sometimes arguments can be a JSON string
                    args = json.loads(arguments)
    except Exception:
        logging.exception(
            "Failed to unwrap Vapi payload; falling back to top-level payload"
        )

    logging.info(f"VAPI structured email ARGUMENTS: {args}")

    required = [
        "subject",
        "request_type",
        "resident_name",
        "resident_phone",
        "address",
        "details",
    ]
    missing = [k for k in required if not args.get(k)]
    if missing:
        # Let Vapi see this as an error – it will surface back to the model
        raise HTTPException(
            status_code=400,
            detail=f"Missing required fields: {', '.join(missing)}",
        )

    # --- Do the actual work (send email) ---
    try:
        send_council_request_email(args)
    except EmailDeliveryError as e:
        raise HTTPException(status_code=502, detail=f"Email delivery failed: {str(e)}")
    except Exception:
        logging.exception("Error processing Vapi structured email")
        raise HTTPException(status_code=500, detail="Internal server error")

    # --- Return success in the exact format Vapi expects ---
    if not tool_call_id:
        # Fallback so we still satisfy the schema even if id missing
        tool_call_id = "unknown"

    return JSONResponse(
        {
            "results": [
                {
                    "toolCallId": tool_call_id,
                    # This is what will appear as the tool's "result" in the logs / model
                    "result": "Request emailed successfully",
                }
            ]
        }
    )



# --- DIRECT TEST for council email sender ---
@api_router.get("/vapi/test-council-email")
async def vapi_test_council_email():
    test_payload = {
        "subject": "TEST – Council email wiring",
        "request_type": "Test",
        "resident_name": "Scott (Test)",
        "resident_phone": "0400 000 000",
        "address": "Test address",
        "details": (
            "This is a test email triggered from /api/vapi/test-council-email to "
            "verify send_council_request_email is working with the current Brevo setup."
        ),
        "council": "Hinchinbrook Shire Council",
    }

    try:
        send_council_request_email(test_payload)
        return {
            "success": True,
            "message": "Test council email function executed.",
        }
    except EmailDeliveryError as e:
        return {"success": False, "source": "brevo", "error": str(e)}
    except Exception as e:
        return {"success": False, "source": "server", "error": repr(e)}

# --- Wire router / CORS / logging ---
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
