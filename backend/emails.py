import os, logging
from datetime import datetime

logger = logging.getLogger(__name__)

class EmailDeliveryError(Exception):
    pass

def send_contact_notification(name: str, email: str, phone: str, message: str):
    """
    Send contact form notification email to scott@aspireexecutive.com.au
    Replace with your preferred provider's API or SMTP as needed.
    """
    # Example: placeholder log instead of actual email (to avoid provider lock-in here)
    # To enable real emails, integrate with SMTP or an email API (e.g. Mailgun/SMTP2GO/SendGrid).
    sender_email = os.getenv('SENDER_EMAIL')
    if not sender_email:
        raise EmailDeliveryError("SENDER_EMAIL not configured")

    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    logger.info(f"[EMAIL] To: {sender_email} | Subject: New Contact Form Submission | Name: {name} | Email: {email} | Phone: {phone} | Message: {message} | At: {timestamp}")
    # If integrating with a provider, raise EmailDeliveryError on failure.
    return True
