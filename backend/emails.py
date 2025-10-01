# backend/emails.py
import os
from datetime import datetime
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

class EmailDeliveryError(Exception):
    pass

def send_contact_notification(name: str, email: str, phone: str, message: str):
    """
    Send via Brevo HTTPS API (works on Render). Reads either:
      - BREVO_API_KEY   (preferred)
      - BREVO_PASSWORD  (fallback; your xkeysib... key)
    And requires:
      - SENDER_EMAIL (verified in Brevo)
      - RECIPIENT_EMAIL (where to receive)
    """
    api_key = (
        os.getenv("BREVO_API_KEY")
        or os.getenv("BREVO_PASSWORD")
        or os.getenv("BREVO_SMTP_KEY")
    )
    sender_email = os.getenv("SENDER_EMAIL")
    recipient_email = os.getenv("RECIPIENT_EMAIL") or sender_email

    if not api_key or not sender_email or not recipient_email:
        raise EmailDeliveryError(
            "Missing BREVO_API_KEY (or BREVO_PASSWORD) / SENDER_EMAIL / RECIPIENT_EMAIL"
        )

    cfg = sib_api_v3_sdk.Configuration()
    cfg.api_key["api-key"] = api_key
    api = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(cfg))

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
        api.send_transac_email(payload)
        return True
    except ApiException as e:
        raise EmailDeliveryError(f"Brevo API error: {e}")
