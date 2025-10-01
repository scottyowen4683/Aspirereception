# backend/emails.py
import os
from datetime import datetime

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

class EmailDeliveryError(Exception):
    pass

def send_contact_notification(name: str, email: str, phone: str, message: str):
    """
    Send contact form notification using Brevo's HTTPS Transactional Email API.
    Works over port 443 (no SMTP), so it's reliable on Render.
    """
    api_key = os.getenv("BREVO_API_KEY") or os.getenv("BREVO_PASSWORD")
    sender_email = os.getenv("SENDER_EMAIL")          # verified in Brevo
    recipient_email = os.getenv("RECIPIENT_EMAIL")    # where you want to receive

    if not api_key or not sender_email or not recipient_email:
        raise EmailDeliveryError("Missing BREVO_API_KEY / SENDER_EMAIL / RECIPIENT_EMAIL")

    # Configure Brevo client
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = api_key
    api_client = sib_api_v3_sdk.ApiClient(configuration)
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(api_client)

    subject = "New Contact Form Submission - Aspire Executive Solutions"
    ts = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")

    html = f"""
    <html><body style="font-family:Arial,sans-serif">
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone or 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;border:1px solid #ddd;padding:10px;border-radius:6px">{message}</div>
      <p style="margin-top:12px;color:#666">Submitted At: {ts}</p>
    </body></html>
    """

    text = f"""New Contact Form Submission

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}

Message:
{message}

Submitted At: {ts}
"""

    payload = sib_api_v3_sdk.SendSmtpEmail(
        sender={"email": sender_email},
        to=[{"email": recipient_email}],
        subject=subject,
        html_content=html,
        text_content=text,
    )

    try:
        api_instance.send_transac_email(payload)
        return True
    except ApiException as e:
        # Surface Brevo error to logs / debug route
        raise EmailDeliveryError(f"Brevo API error: {e}")
