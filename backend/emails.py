import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

logger = logging.getLogger(__name__)

class EmailDeliveryError(Exception):
    pass

def send_contact_notification(name: str, email: str, phone: str, message: str):
    """
    Send contact form notification email via Brevo SMTP
    """

    smtp_host = "smtp-relay.brevo.com"
    smtp_port = 587
    smtp_user = os.getenv("BREVO_SMTP_USER")  # usually your Brevo login (email address)
    smtp_pass = os.getenv("BREVO_SMTP_KEY")   # the long API key (you pasted earlier)
    recipient_email = os.getenv("SENDER_EMAIL")

    if not smtp_user or not smtp_pass or not recipient_email:
        raise EmailDeliveryError("SMTP credentials or recipient email not configured")

    subject = "New Contact Form Submission - Aspire Executive Solutions"
    body = f"""
    New Contact Submission:

    Name: {name}
    Email: {email}
    Phone: {phone if phone else 'Not provided'}

    Message:
    {message}
    """

    try:
        msg = MIMEMultipart()
        msg["From"] = smtp_user
        msg["To"] = recipient_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, recipient_email, msg.as_string())

        logger.info("Email sent successfully via Brevo")
        return True

    except Exception as e:
        logger.error(f"Failed to send email via Brevo: {str(e)}")
        raise EmailDeliveryError(f"Failed to send email: {str(e)}")
