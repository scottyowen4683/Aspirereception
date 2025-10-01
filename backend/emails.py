import os
import smtplib
from email.mime.text import MIMEText

class EmailDeliveryError(Exception):
    pass

def send_contact_notification(name, email, phone, message):
    try:
        smtp_host = os.getenv("SMTP_HOST", "smtp-relay.brevo.com")
        smtp_port = int(os.getenv("SMTP_PORT", 587))
        smtp_user = os.getenv("BREVO_USERNAME", "apikey")  # Brevo always uses "apikey"
        smtp_pass = os.getenv("BREVO_PASSWORD")  # Your Brevo SMTP key
        sender = os.getenv("SENDER_EMAIL")
        recipient = os.getenv("RECIPIENT_EMAIL")

        if not smtp_pass or not sender or not recipient:
            raise EmailDeliveryError("SMTP credentials or recipient email not configured")

        body = f"""
        New contact form submission:

        Name: {name}
        Email: {email}
        Phone: {phone}
        Message:
        {message}
        """

        msg = MIMEText(body)
        msg["Subject"] = "New Contact Form Submission"
        msg["From"] = sender
        msg["To"] = recipient

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(sender, [recipient], msg.as_string())

    except Exception as e:
        raise EmailDeliveryError(str(e))


    except Exception as e:
        logger.error(f"Failed to send email via Brevo: {str(e)}")
        raise EmailDeliveryError(f"Failed to send email: {str(e)}")
