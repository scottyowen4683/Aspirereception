import os
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

class EmailDeliveryError(Exception):
    pass

def send_contact_notification(name, email, phone, message):
    api_key = os.getenv("BREVO_API_KEY")
    sender_email = os.getenv("SENDER_EMAIL")
    recipient_email = os.getenv("RECIPIENT_EMAIL", sender_email)

    if not api_key or not sender_email or not recipient_email:
        raise EmailDeliveryError("Brevo credentials or recipient email not configured")

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = api_key

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    subject = "New Contact Form Submission"
    body = f"""
    New contact submission received:

    Name: {name}
    Email: {email}
    Phone: {phone}
    Message: {message}
    """

    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": recipient_email}],
        sender={"email": sender_email},
        subject=subject,
        text_content=body
    )

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        print("✅ Email sent successfully:", api_response)
    except ApiException as e:
        raise EmailDeliveryError(f"Brevo API error: {str(e)}")
