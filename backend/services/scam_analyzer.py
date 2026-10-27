"""
BrainByte ScamShield - Advanced Text Scam Analysis Engine
Detects fraud patterns, urgency coercion, impersonation, credential harvesting,
and fake lottery/job schemes in English and Hindi (Romanized & Devanagari).
"""

import re
from typing import Dict, Any, List

# Heuristic patterns for rapid local analysis
SCAM_INDICATORS = [
    {
        "category": "impersonation",
        "tag": "Authority / Bank Impersonation",
        "tag_hi": "प्राधिकरण / बैंक का फर्जी ढोंग",
        "severity": "critical",
        "weight": 35,
        "keywords": [
            "sbi", "hdfc", "icici", "pnb", "rbi", "reserve bank", "cbi", "police",
            "mumbai police", "cyber cell", "ncb", "customs", "electricity board",
            "bsnl", "jio", "fedex", "india post", "income tax department",
            "बिजली विभाग", "पुलिस", "बैंक", "सीबीआई", "कस्टम"
        ],
        "pattern": r"(sbi|hdfc|icici|rbi|cbi|police|customs|fedex|electricity\s*department|income\s*tax|cyber\s*crime)",
        "explanation": "Message claims to be from a bank, police, or government authority to build false credibility.",
        "explanation_hi": "संदेश किसी बैंक, पुलिस या सरकारी विभाग के नाम से फर्जी भरोसा बनाने की कोशिश कर रहा है।"
    },
    {
        "category": "urgency",
        "tag": "Artificial Panic & Extreme Urgency",
        "tag_hi": "नकली घबराहट और तुरंत कार्रवाई का दबाव",
        "severity": "high",
        "weight": 30,
        "keywords": [
            "immediately", "within 24 hours", "urgent", "account will be blocked",
            "electricity power will be disconnected", "tonight 9:30", "arrest warrant",
            "action will be taken", "suspended", "deactivated", "last reminder",
            "turant", "aaj raat", "khata band", "karyawahi", "police aayegi",
            "तुरंत", "बंद हो जाएगा", "बिजली कट जाएगी", "अंतिम चेतावनी"
        ],
        "pattern": r"(within\s*\d+\s*hours?|immediately|urgently|blocked|suspended|disconnected|tonight|turant|band\s*ho)",
        "explanation": "Creates intense time pressure and panic so you act quickly without verifying.",
        "explanation_hi": "आपको डराने और बिना सोचे-समझे तुरंत पैसे या जानकारी देने के लिए दबाव बनाया गया है।"
    },
    {
        "category": "credential_harvesting",
        "tag": "Credential / KYC / OTP Harvesting",
        "tag_hi": "केवाईसी, ओटीपी या व्यक्तिगत जानकारी चोरी",
        "severity": "critical",
        "weight": 40,
        "keywords": [
            "kyc update", "verify pan", "aadhaar link", "submit otp", "share pin",
            "download apk", "anydesk", "teamviewer", "rustdesk", "update kyc",
            "kyc expire", "pan expire", "otp bhejo", "link pe click",
            "केवाईसी", "ओटीपी", "पैन कार्ड", "आधार"
        ],
        "pattern": r"(kyc\s*update|verify\s*pan|share\s*otp|enter\s*pin|download\s*apk|anydesk|rustdesk)",
        "explanation": "Asks for sensitive credentials, OTP, or demands downloading remote access/fraudulent APK apps.",
        "explanation_hi": "आपसे गुप्त पासवर्ड, ओटीपी या खतरनाक ऐप डाउनलोड कराने की कोशिश की जा रही है।"
    },
    {
        "category": "suspicious_links",
        "tag": "Phishing or Unofficial Masked Link",
        "tag_hi": "फर्जी या संदिग्ध लिंक",
        "severity": "critical",
        "weight": 35,
        "keywords": ["bit.ly", "tinyurl", ".top", ".xyz", ".buzz", ".live", "ngrok", "apk", "t.me/"],
        "pattern": r"(https?://[^\s]+)",
        "explanation": "Contains unverified shortened, deceptive, or non-governmental/non-banking web links.",
        "explanation_hi": "संदेश में असुरक्षित या फर्जी वेबसाइट का लिंक है जो आपकी जानकारी चुरा सकता है।"
    },
    {
        "category": "financial_fraud",
        "tag": "Unrealistic Financial Return / Telegram Job / UPI Coercion",
        "tag_hi": "फर्जी लॉटरी, नौकरी या यूपीआई पेमेंट धोखाधड़ी",
        "severity": "high",
        "weight": 30,
        "keywords": [
            "part time job", "earn 5000 daily", "like youtube videos", "telegram group",
            "lottery winner", "kaun banega crorepati", "crypto double", "security deposit",
            "claim reward", "ghar baithe kamaye", "paise jeete",
            "लॉटरी", "पार्ट टाइम जॉब", "घर बैठे कमाएं"
        ],
        "pattern": r"(earn\s*(rs|\u20b9)?\s*\d+|part[\s-]*time\s*job|like\s*youtube|lottery|winner|crore)",
        "explanation": "Promises unrealistic fast earnings or prize money in exchange for pre-payments or task scams.",
        "explanation_hi": "बिना मेहनत के पैसे कमाने या लॉटरी जीतने का लालच देकर पैसे ऐंठने की चाल है।"
    }
]

SAFE_WHITELIST_KEYWORDS = [
    "credited to your account", "salary credited", "debited for inr", "available balance",
    "otp for login is", "never share otp with anyone", "bank will never ask for",
    "statement generated", "thank you for shopping"
]

def analyze_text_message(text: str, language: str = "en") -> Dict[str, Any]:
    """
    Analyzes message content and returns risk score, verdict, red flags,
    and immediate bilingual action guidelines.
    """
    if not text or len(text.strip()) < 3:
        return {
            "risk_score": 0,
            "verdict": "SAFE",
            "verdict_label": "No Suspicious Signals Found",
            "verdict_label_hi": "कोई संदिग्ध संकेत नहीं मिला",
            "red_flags": [],
            "urgency_score": 0,
            "detected_links": [],
            "action_guide": {
                "summary": "Message appears neutral or empty.",
                "summary_hi": "संदेश सामान्य प्रतीत होता है।",
                "dos": ["Stay vigilant with unsolicited messages."],
                "donts": ["Never share financial credentials."]
            }
        }

    clean_text = text.lower()
    score = 0
    matched_flags = []
    
    # Extract links
    urls = re.findall(r"https?://[^\s<>\"']+|www\.[^\s<>\"']+", clean_text)
    
    # Check whitelist signals (e.g. genuine bank SMS)
    has_safe_patterns = any(term in clean_text for term in SAFE_WHITELIST_KEYWORDS)
    has_warning_not_to_share = "never share" in clean_text or "do not share" in clean_text

    # Evaluate heuristic flags
    for ind in SCAM_INDICATORS:
        matched = False
        matched_words = []
        
        # Check keyword matches
        for kw in ind["keywords"]:
            if kw in clean_text:
                matched = True
                matched_words.append(kw)
        
        # Check regex pattern
        if not matched and re.search(ind["pattern"], clean_text, re.IGNORECASE):
            matched = True

        if matched:
            score += ind["weight"]
            matched_flags.append({
                "category": ind["category"],
                "tag": ind["tag"],
                "tag_hi": ind["tag_hi"],
                "severity": ind["severity"],
                "explanation": ind["explanation"],
                "explanation_hi": ind["explanation_hi"],
                "matched_terms": matched_words[:3]
            })

    # Adjust score if legitimate bank advisory cues are present
    if has_safe_patterns and has_warning_not_to_share and len(urls) == 0:
        score = max(5, int(score * 0.15))

    # Cap score 0 - 100
    risk_score = min(100, max(0, score))

    if risk_score >= 70:
        verdict = "SCAM"
        verdict_label = "HIGH RISK: Probable Cyber Scam"
        verdict_label_hi = "खतरनाक धोखाधड़ी (हाई रिस्क स्कैम)"
        theme = "crimson"
    elif risk_score >= 35:
        verdict = "SUSPICIOUS"
        verdict_label = "SUSPICIOUS: Unverified & Risky Message"
        verdict_label_hi = "संदिग्ध संदेश: सावधानी बरतें"
        theme = "amber"
    else:
        verdict = "SAFE"
        verdict_label = "LIKELY SAFE: Normal Transaction or Advisory"
        verdict_label_hi = "सुरक्षित संदेश: सामान्य सूचना"
        theme = "emerald"

    # Action guidelines
    action_guide = {
        "summary": "This message exhibits strong scam tactics (urgency, impersonation, or credential theft). Do NOT comply." if verdict == "SCAM" else "Always verify sender identity through official customer care numbers.",
        "summary_hi": "यह संदेश धोखाधड़ी की रणनीति दर्शाता है। किसी भी लिंक पर क्लिक न करें और पैसे न भेजें।" if verdict == "SCAM" else "हमेशा आधिकारिक बैंक या संस्था से संपर्क करके ही किसी संदेश पर विश्वास करें।",
        "dos": [
            "Dial 1930 immediately if money has already been deducted.",
            "Report fraudulent messages to cybercrime.gov.in or Chakshu portal.",
            "Block and report the sender phone number on WhatsApp / SMS app.",
            "Verify with your bank using the phone number printed on the back of your card."
        ],
        "donts": [
            "DO NOT click any link provided in this message.",
            "DO NOT share OTP, UPI PIN, or bank passwords with anyone.",
            "DO NOT install remote screen-sharing apps (AnyDesk, TeamViewer, RustDesk).",
            "DO NOT transfer money to any 'security' or 'verification' account."
        ],
        "dos_hi": [
            "यदि पैसे कट चुके हैं तो तुरंत 1930 साइबर हेल्पलाइन पर कॉल करें।",
            "संदेश को cybercrime.gov.in या चक्षु पोर्टल पर रिपोर्ट करें।",
            "संदेश भेजने वाले नंबर को तुरंत ब्लॉक करें।",
            "बैंक की आधिकारिक शाखा या अपने एटीएम कार्ड के पीछे दिए नंबर पर संपर्क करें।"
        ],
        "donts_hi": [
            "संदेश में दिए गए किसी भी लिंक पर बिल्कुल क्लिक न करें।",
            "किसी को भी अपना ओटीपी, यूपीआई पिन या बैंक पासवर्ड न बताएं।",
            "कोई भी ऐप (AnyDesk, TeamViewer) डाउनलोड न करें।",
            "किसी भी 'वेरिफिकेशन खाते' में पैसे न भेजें।"
        ]
    }

    return {
        "risk_score": risk_score,
        "verdict": verdict,
        "verdict_label": verdict_label,
        "verdict_label_hi": verdict_label_hi,
        "theme": theme,
        "red_flags": matched_flags,
        "detected_links": urls,
        "action_guide": action_guide,
        "helpline": {
            "name": "National Cyber Crime Helpline",
            "number": "1930",
            "portal": "https://cybercrime.gov.in",
            "hours": "24x7 Toll Free"
        }
    }
