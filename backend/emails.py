# backend/emails.py
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class EmailDeliveryError(Exception):
    pass

def _get_smtp():
    host = os.getenv("SMTP_HOST", "smtp-relay.brevo.com")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("BREVO_USERNAME", "apikey")   # Brevo uses "apikey" as the username
    pwd  = os.getenv("BREVO_PASSWORD")             # Your Brevo API key
    if not pwd:
        raise EmailDeliveryError("BREVO_PASSWORD (API key) is missing.")
    s = smtplib.SMTP(host, port, timeout=20)
    s.starttls()
    s.login(user, pwd)
    return s

def send_contact_notification(name: str, email: str, phone: str, message: str):
    """
    Send contact form notification using Brevo SMTP.
    From: verified sender on your Brevo domain
    To:   your real inbox (can be any domain)
    """
    sender = os.getenv("SENDER_EMAIL")  # e.g. scott.owen@aspirerecruitment.com.au
    recipient = os.getenv("RECIPIENT_EMAIL")  # e.g. scott@aspireexecutive.com.au

    if not sender:
        raise EmailDeliveryError("SENDER_EMAIL is missing.")
    if not recipient:
        raise EmailDeliveryError("RECIPIENT_EMAIL is missing.")

    subject = "New Contact Form Submission - Aspire Executive Solutions"
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")

    plain = f"""You have received a new contact form submission:

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}

Message:
{message}

Submitted At: {timestamp}
"""

    html = f"""
<html>
  <body style="font-family:Arial,sans-serif;color:#111">
    <div style="max-width:640px;margin:auto;border:1px solid #e5e7eb;border-radius:8px">
      <div style="background:#1e3a8a;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0">
        <h2 style="margin:0">New Contact Form Submission</h2>
        <p style="margin:4px 0 0 0;opacity:.9">Aspire Executive Solutions</p>
      </div>
      <div style="padding:20px;background:#f8fafc">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
        <p><strong>Phone:</strong> {phone or 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <div style="background:#fff;border:1px solid #cbd5e1;border-radius:6px;padding:12px;white-space:pre-wrap">{message}</div>
        <p style="margin-top:16px"><strong>Submitted At:</strong> {timestamp}</p>
      </div>
    </div>
  </body>
</html>
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient
    msg.attach(MIMEText(plain, "plain"))
    msg.attach(MIMEText(html, "html"))

    try:
        with _get_smtp() as s:
            s.sendmail(sender, [recipient], msg.as_string())
        logger.info("SMTP email sent to %s", recipient)
        return True
    except Exception as e:
        logger.exception("SMTP send failed: %s", e)
        raise EmailDeliveryError(str(e))
