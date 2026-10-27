"""
BrainByte ScamShield - National Scam Intelligence & Trend Radar
Real-time feed of trending scam patterns, cyber-crime hotspots,
and preventative intelligence across Indian states.
"""

from typing import List, Dict, Any

TRENDING_SCAMS: List[Dict[str, Any]] = [
    {
        "id": "SCAM-2026-089",
        "category": "Digital Arrest Extortion",
        "category_hi": "डिजिटल अरेस्ट रंगदारी",
        "hotspots": ["New Delhi", "Mumbai", "Bengaluru", "Pune"],
        "threat_level": "CRITICAL",
        "victim_profile": "Senior citizens, retired professionals, homemakers",
        "modus_operandi": "Victim receives a video call from impersonators posing as Mumbai Police / CBI claiming a FedEx courier with MDMA drugs was booked with their Aadhaar. Demands continuous video surveillance and ₹5-20 Lakh transfer to RBI clearance escrow.",
        "prevention_tip": "Law enforcement NEVER conducts digital arrests or asks for money on video calls. Hang up and dial 1930.",
        "prevention_tip_hi": "पुलिस कभी भी वीडियो कॉल पर अरेस्ट नहीं करती और न ही पैसे मांगती है। तुरंत 1930 पर कॉल करें।",
        "reports_today": 342
    },
    {
        "id": "SCAM-2026-090",
        "category": "Electricity Power Disconnection Tonight",
        "category_hi": "बिजली बिल भुगतान न होने की फर्जी धमकी",
        "hotspots": ["Jaipur", "Lucknow", "Patna", "Kolkata"],
        "threat_level": "HIGH",
        "victim_profile": "Households, shop owners, elderly residents",
        "modus_operandi": "SMS claims: 'Dear Consumer, Your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Immediately call Electricity Officer at 98765XXXXX.' They ask you to install quick-support APK.",
        "prevention_tip": "Power distribution companies (DISCOMs) never send personal mobile numbers for bill updates or disconnect at night.",
        "prevention_tip_hi": "बिजली विभाग रात में बिजली काटने का एसएमएस किसी निजी मोबाइल नंबर से नहीं भेजता।",
        "reports_today": 819
    },
    {
        "id": "SCAM-2026-091",
        "category": "Telegram 'Like YouTube Videos' Task Fraud",
        "category_hi": "टेलीग्राम यूट्यूब वीडियो लाइक जॉब स्कैम",
        "hotspots": ["Hyderabad", "Chennai", "Indore", "Ahmedabad"],
        "threat_level": "HIGH",
        "victim_profile": "College students, job seekers, housewives",
        "modus_operandi": "Victim is offered ₹150 per video like on YouTube. First few tasks pay ₹500 to build trust. Then victim is lured into high-yield VIP crypto investment tasks where deposited money cannot be withdrawn.",
        "prevention_tip": "Legitimate companies never ask you to deposit money to receive your earnings.",
        "prevention_tip_hi": "कमाई करने के लिए किसी भी कंपनी में पहले पैसे जमा न करें।",
        "reports_today": 624
    },
    {
        "id": "SCAM-2026-092",
        "category": "YONO / SBI / HDFC Fake KYC Expiry SMS",
        "category_hi": "फर्जी बैंक केवाईसी एक्सपायरी एसएमएस",
        "hotspots": ["All India", "Pan-India"],
        "threat_level": "CRITICAL",
        "victim_profile": "Internet banking customers",
        "modus_operandi": "SMS warning: 'Your NetBanking will be suspended in 24 hours. Update PAN immediately at https://sbi-kyc-update.xyz'. The phishing site harvests username, password, and OTP in real time.",
        "prevention_tip": "Banks never send SMS containing third-party links or ask for password/OTP verification via SMS.",
        "prevention_tip_hi": "बैंक कभी भी एसएमएस में किसी लिंक पर क्लिक करके पासवर्ड या ओटीपी दर्ज करने को नहीं कहता।",
        "reports_today": 1240
    }
]

def get_national_scam_feed() -> List[Dict[str, Any]]:
    """Returns real-time scam threat intelligence."""
    return TRENDING_SCAMS
