"""
BrainByte ScamShield - Family Protection Alert Dispatcher
Notifies trusted relatives (children, spouse, guardians) when a vulnerable
family member encounters a high-risk scam or digital arrest call.
"""

from datetime import datetime
from typing import Dict, Any, List
import urllib.parse

# In-memory storage for active demo alerts
ALERT_HISTORY: List[Dict[str, Any]] = []

def generate_family_alert(
    trusted_name: str,
    trusted_phone: str,
    victim_name: str,
    scam_type: str,
    risk_score: int,
    snippet: str,
    relation: str = "Family Member"
) -> Dict[str, Any]:
    """
    Constructs high-priority security notification and pre-filled WhatsApp deep-link.
    """
    timestamp = datetime.now().strftime("%d %b %Y, %I:%M %p")
    
    # Clean phone
    phone_clean = "".join([c for c in trusted_phone if c.isdigit()])
    if len(phone_clean) == 10:
        phone_clean = "91" + phone_clean

    # Pre-composed urgent alert text
    alert_message_en = (
        f"🚨 *ScamShield Emergency Family Alert*\n\n"
        f"Dear {trusted_name},\n"
        f"Your {relation} *{victim_name}* just scanned a HIGH-RISK SCAM message on ScamShield!\n\n"
        f"⚠️ *Threat Level:* {risk_score}% (CRITICAL)\n"
        f"📌 *Detected Scam Type:* {scam_type}\n"
        f"📝 *Message Snippet:* \"{snippet[:120]}...\"\n\n"
        f"🛡️ *Action Required Now:*\n"
        f"1. Please call {victim_name} immediately to ensure they do not send any money or OTP.\n"
        f"2. Indian Law Enforcement / Police NEVER conduct 'Digital Arrest' or ask for money.\n"
        f"3. In case money was already deducted, dial 1930 Cybercrime Helpline right away.\n\n"
        f"- Sent via BrainByte ScamShield Family Shield"
    )

    alert_message_hi = (
        f"🚨 *स्कैमशील्ड इमरजेंसी फैमिली अलर्ट*\n\n"
        f"प्रिय {trusted_name},\n"
        f"आपके {relation} *{victim_name}* ने स्कैमशील्ड पर एक बहुत खतरनाक धोखाधड़ी संदेश/कॉल स्कैन किया है!\n\n"
        f"⚠️ *खतरे का स्तर:* {risk_score}% (गंभीर)\n"
        f"📌 *धोखाधड़ी का प्रकार:* {scam_type}\n\n"
        f"🛡️ *तुरंत क्या करें:*\n"
        f"1. तुरंत {victim_name} को फोन करें और कोई भी पैसा या ओटीपी देने से मना करें।\n"
        f"2. कोई भी पुलिस या सरकारी विभाग कभी भी व्हाट्सएप पर गिरफ्तारी नहीं करता।\n"
        f"3. सहायता के लिए तुरंत 1930 साइबर हेल्पलाइन पर कॉल करें।"
    )

    encoded_en = urllib.parse.quote(alert_message_en)
    whatsapp_url = f"https://wa.me/{phone_clean}?text={encoded_en}"

    alert_record = {
        "id": f"ALERT-{len(ALERT_HISTORY) + 1:04d}",
        "timestamp": timestamp,
        "recipient": {
            "name": trusted_name,
            "phone": trusted_phone,
            "relation": relation
        },
        "victim_name": victim_name,
        "scam_type": scam_type,
        "risk_score": risk_score,
        "whatsapp_url": whatsapp_url,
        "message_preview_en": alert_message_en,
        "message_preview_hi": alert_message_hi,
        "status": "DISPATCHED_TO_DEVICE"
    }

    ALERT_HISTORY.insert(0, alert_record)
    return alert_record

def get_alert_history() -> List[Dict[str, Any]]:
    """Returns past dispatched family alerts."""
    return ALERT_HISTORY
