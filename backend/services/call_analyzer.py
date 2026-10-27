"""
BrainByte ScamShield - Voice Call & Digital Arrest Detection Engine
Detects voice-call scams, coercive authority impersonation, simulated arrest demands,
and extortion scripts with timestamped transcript markers.
"""

from typing import Dict, Any, List

DIGITAL_ARREST_KEYWORDS = [
    "digital arrest", "police station", "cbi officer", "ed officer", "mumbai police",
    "delhi police", "crime branch", "customs department", "fedex parcel", "narcotics",
    "drugs found", "passport seized", "money laundering", "court warrant", "non bailable",
    "stay on video call", "skype call", "do not tell anyone", "national security",
    "rbi verification account", "clearance fund", "secrecy agreement", "digital custody",
    "डिजिटल अरेस्ट", "पुलिस स्टेशन", "सीबीआई", "मनी लॉन्ड्रिंग", "गिरफ्तारी वारंट"
]

SAMPLE_TRANSCRIPTS = {
    "digital_arrest_police": {
        "title": "Mumbai Police / FedEx Narcotics Digital Arrest Scam",
        "title_hi": "मुंबई पुलिस / फेडेक्स नारकोटिक्स डिजिटल अरेस्ट स्कैम",
        "audio_duration": "01:42",
        "transcript": """[00:02] Caller: Hello, this is Inspector Rathore calling from Mumbai Crime Branch Headquarters.
[00:15] Caller: Your Aadhaar card ending in 8912 has been found linked to a suspicious FedEx package containing 140 grams of MDMA narcotics and 5 fake passports sent to Cambodia.
[00:34] Caller: A Non-Bailable Arrest Warrant (NBW) has been issued against you under Section 420 and NDPS Act.
[00:52] Caller: You are placed under immediate 'Digital Arrest'. You must keep your WhatsApp video call on for the next 4 hours. Do not speak to your family or lawyer, as this case is classified under National Security.
[01:18] Caller: To verify your financial innocence, the Supreme Court requires an asset verification deposit. Transfer ₹2,50,000 to the Reserve Bank of India clearance escrow account immediately. Once audited, it will be refunded.""",
        "simulated_score": 99
    },
    "bank_manager_kyc": {
        "title": "Fake Bank Manager KYC Blocking Call",
        "title_hi": "फर्जी बैंक मैनेजर केवाईसी सस्पेंशन कॉल",
        "audio_duration": "01:10",
        "transcript": """[00:03] Caller: Good morning, I am calling from SBI Main Branch Card Security Division.
[00:14] Caller: Sir, your debit card and NetBanking services are expiring in 15 minutes due to pending regulatory KYC update.
[00:28] Caller: I have sent a 6-digit verification code to your registered mobile number. Please read it out to me immediately so I can re-activate your account without penalty.""",
        "simulated_score": 94
    },
    "genuine_delivery_call": {
        "title": "Genuine Delivery Partner Call",
        "title_hi": "वास्तविक डिलीवरी पार्टनर कॉल",
        "audio_duration": "00:45",
        "transcript": """[00:02] Caller: Namaste sir, I am calling from Amazon delivery. I am standing near your apartment gate.
[00:18] Caller: Could you please provide your house flat number, or should I leave the package with the security guard?
[00:32] Caller: Thank you sir, I will deliver to tower B reception.""",
        "simulated_score": 4
    }
}

def analyze_call_transcript(transcript: str, language: str = "en") -> Dict[str, Any]:
    """
    Analyzes call transcript or extracted voice audio text for extortion,
    authority impersonation, and Digital Arrest coercion.
    """
    if not transcript or len(transcript.strip()) < 10:
        return {
            "risk_score": 0,
            "verdict": "SAFE",
            "verdict_label": "No Suspicious Call Patterns Detected",
            "verdict_label_hi": "कॉल में कोई संदिग्ध गतिविधि नहीं मिली",
            "is_digital_arrest": False,
            "danger_markers": [],
            "action_guide": {}
        }

    clean_text = transcript.lower()
    score = 0
    matched_danger_markers = []
    
    # 1. Impersonation of law enforcement
    police_terms = ["police", "crime branch", "cbi", "ed", "customs", "inspector", "narcotics", "supreme court"]
    matched_police = [w for w in police_terms if w in clean_text]
    if matched_police:
        score += 35
        matched_danger_markers.append({
            "segment": "Police / Government Impersonation",
            "segment_hi": "पुलिस या जांच एजेंसी का फर्जी नाम",
            "severity": "critical",
            "detail": f"Caller claims to be {', '.join(matched_police).upper()} to intimidate you.",
            "detail_hi": "कॉलर खुद को पुलिस या सीबीआई अधिकारी बताकर डरा रहा है।"
        })

    # 2. Digital Arrest / Forced Video Confinement
    arrest_terms = ["digital arrest", "video call", "skype", "digital custody", "do not disconnect", "camera on"]
    matched_arrest = [w for w in arrest_terms if w in clean_text]
    if matched_arrest:
        score += 45
        matched_danger_markers.append({
            "segment": "Coercive Digital Arrest Demand",
            "segment_hi": "फर्जी 'डिजिटल अरेस्ट' का दबाव",
            "severity": "critical",
            "detail": "Ordering you to stay on video call or threatening 'digital arrest' is 100% FRAUD.",
            "detail_hi": "भारतीय कानून में 'डिजिटल अरेस्ट' नाम की कोई चीज़ नहीं है। यह 100% फ्रॉड है।"
        })

    # 3. Secrecy & Isolating the Victim
    isolation_terms = ["do not tell", "secret", "national security", "don't inform", "confidential case", "lawyer"]
    matched_isolation = [w for w in isolation_terms if w in clean_text]
    if matched_isolation:
        score += 25
        matched_danger_markers.append({
            "segment": "Victim Isolation Tactic",
            "segment_hi": "पीड़ित को परिवार से अलग करने की चाल",
            "severity": "high",
            "detail": "Forbidding you from talking to family or police is designed to prevent you from getting help.",
            "detail_hi": "आपको परिवार या वकील से बात करने से मना किया जा रहा है ताकि कोई आपको बचा न सके।"
        })

    # 4. Financial Extortion Demand
    money_terms = ["transfer", "escrow", "verification account", "deposit", "clearance fund", "rbi account", "penalty"]
    matched_money = [w for w in money_terms if w in clean_text]
    if matched_money:
        score += 35
        matched_danger_markers.append({
            "segment": "Extortion / Fund Transfer Request",
            "segment_hi": "पैसे ट्रांसफर कराने की मांग",
            "severity": "critical",
            "detail": "Government agencies NEVER ask for money transfers into 'verification' or 'RBI clearance' accounts.",
            "detail_hi": "कोई भी सरकारी एजेंसी कभी भी 'वेरिफिकेशन खाते' में पैसे ट्रांसफर करने को नहीं कहती।"
        })

    # 5. OTP / KYC extortion
    otp_terms = ["otp", "code", "cvv", "pin", "password"]
    matched_otp = [w for w in otp_terms if w in clean_text]
    if matched_otp:
        score += 30
        matched_danger_markers.append({
            "segment": "Live Credential / OTP Demand",
            "segment_hi": "फोन पर ओटीपी या पिन मांगने का प्रयास",
            "severity": "critical",
            "detail": "Caller is trying to extract immediate one-time authentication codes.",
            "detail_hi": "कॉलर आपके बैंक का गुप्त ओटीपी हासिल करना चाहता है।"
        })

    risk_score = min(100, max(0, score))
    is_digital_arrest = ("digital arrest" in clean_text) or (len(matched_police) > 0 and len(matched_arrest) > 0) or (len(matched_police) > 0 and len(matched_money) > 0)

    if risk_score >= 70:
        verdict = "SCAM"
        verdict_label = "HIGH-RISK CALL FRAUD: Digital Arrest / Extortion Alert"
        verdict_label_hi = "अत्यंत खतरनाक: फर्जी डिजिटल अरेस्ट / रंगदारी कॉल"
        theme = "crimson"
    elif risk_score >= 35:
        verdict = "SUSPICIOUS"
        verdict_label = "SUSPICIOUS CALL: Coercive Tactics Detected"
        verdict_label_hi = "संदिग्ध कॉल: दबाव बनाने की कोशिश"
        theme = "amber"
    else:
        verdict = "SAFE"
        verdict_label = "SAFE: Normal Conversational Call"
        verdict_label_hi = "सुरक्षित: सामान्य कॉल"
        theme = "emerald"

    legal_fact = "CRITICAL FACT: Indian law enforcement agencies (Police, CBI, ED, Courts) DO NOT conduct 'Digital Arrests'. They never arrest suspects over Skype or WhatsApp, nor do they ask anyone to deposit funds for verification."
    legal_fact_hi = "महत्वपूर्ण कानूनी तथ्य: भारतीय कानून में 'डिजिटल अरेस्ट' का कोई प्रावधान नहीं है। पुलिस या सीबीआई कभी भी व्हाट्सएप या स्काइप पर गिरफ्तारी नहीं करती और न ही पैसे मांगती है।"

    return {
        "risk_score": risk_score,
        "verdict": verdict,
        "verdict_label": verdict_label,
        "verdict_label_hi": verdict_label_hi,
        "theme": theme,
        "is_digital_arrest": is_digital_arrest,
        "legal_fact": legal_fact,
        "legal_fact_hi": legal_fact_hi,
        "danger_markers": matched_danger_markers,
        "recommended_actions": [
            "Disconnect the call immediately without hesitation.",
            "Do NOT transfer any money or provide bank details.",
            "Inform your family members or a trusted friend immediately.",
            "Dial 1930 Cybercrime Helpline or visit your nearest local police station.",
            "Block the calling number on your mobile phone."
        ],
        "recommended_actions_hi": [
            "बिना किसी डर के तुरंत कॉल काट दें।",
            "कोई भी रुपया ट्रांसफर न करें और न ही बैंक जानकारी दें।",
            "तुरंत अपने परिवार या किसी करीबी रिश्तेदार को सूचित करें।",
            "1930 साइबर हेल्पलाइन पर कॉल करें या नजदीकी थाने जाएं।",
            "कॉलर का नंबर अपने फोन में तुरंत ब्लॉक करें।"
        ]
    }

def get_sample_call_presets() -> Dict[str, Any]:
    """Returns curated presets for testing."""
    return SAMPLE_TRANSCRIPTS
