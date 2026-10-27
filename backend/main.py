"""
BrainByte ScamShield - Core Backend API Engine
AI that detects scams in messages, links and calls, in real time.
"""

from fastapi import FastAPI, UploadFile, File, Form, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from services.scam_analyzer import analyze_text_message
from services.call_analyzer import analyze_call_transcript, get_sample_call_presets
from services.ocr_service import analyze_screenshot_content, get_screenshot_presets
from services.link_checker import check_link_safety
from services.family_alert import generate_family_alert, get_alert_history
from services.scam_feed import get_national_scam_feed

app = FastAPI(
    title="BrainByte ScamShield API",
    description="Real-Time AI Scam, Phishing & Digital Arrest Detection Engine with Family Shield",
    version="2.0.0"
)

# Enable CORS for React frontend & local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class TextScanRequest(BaseModel):
    text: str
    language: Optional[str] = "en"

class LinkScanRequest(BaseModel):
    url: str
    language: Optional[str] = "en"

class CallScanRequest(BaseModel):
    transcript: str
    language: Optional[str] = "en"

class FamilyAlertRequest(BaseModel):
    trusted_name: str
    trusted_phone: str
    victim_name: Optional[str] = "Family Member"
    scam_type: str
    risk_score: int
    snippet: str
    relation: Optional[str] = "Parent"

@app.get("/")
def read_root():
    """Metadata and project status."""
    return {
        "project": "BrainByte ScamShield",
        "tagline": "AI that detects scams in messages, links and calls, in real time",
        "team": "BrainByte",
        "version": "2.0.0",
        "status": "Operational",
        "features": [
            "Multi-input Check: Text, Screenshot (OCR), Call Audio",
            "Digital Arrest & Police Impersonation Detector",
            "Red-flag Plain Language Explainer (English & Hindi)",
            "1930 Cybercrime Helpline & Action Guide",
            "Family Protection Mode (Trusted Contact Alert)",
            "Live Threat Radar / National Scam Feed"
        ],
        "helpline": "1930 (Cyber Crime Helpline India)"
    }

@app.post("/api/scan/text")
def scan_text_endpoint(req: TextScanRequest):
    """Scan SMS, WhatsApp message, email or pasted text."""
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    return analyze_text_message(text=req.query if hasattr(req, 'query') else req.text, language=req.language or "en")

@app.post("/api/scan/link")
def scan_link_endpoint(req: LinkScanRequest):
    """Scan a link or domain for typosquatting, shorteners, or phishing."""
    return check_link_safety(url=req.url, language=req.language or "en")

@app.post("/api/scan/call")
def scan_call_endpoint(req: CallScanRequest):
    """Analyze phone call recording or transcript for Digital Arrest and extortion."""
    return analyze_call_transcript(transcript=req.transcript, language=req.language or "en")

@app.post("/api/scan/screenshot")
def scan_screenshot_endpoint(
    extracted_text: Optional[str] = Form(None),
    language: Optional[str] = Form("en"),
    image: Optional[UploadFile] = File(None)
):
    """Analyze uploaded screenshot using OCR heuristics."""
    image_b64 = None
    image_name = image.filename if image else "screenshot.png"
    if image:
        try:
            import base64
            contents = image.file.read()
            image_b64 = base64.b64encode(contents).decode("utf-8")
        except Exception:
            pass

    return analyze_screenshot_content(
        image_base64=image_b64,
        image_name=image_name,
        extracted_text_override=extracted_text,
        language=language or "en"
    )

@app.post("/api/family-alert")
def send_family_alert_endpoint(req: FamilyAlertRequest):
    """Dispatches a Family Protection Alert to trusted relatives."""
    return generate_family_alert(
        trusted_name=req.trusted_name,
        trusted_phone=req.trusted_phone,
        victim_name=req.victim_name or "Family Member",
        scam_type=req.scam_type,
        risk_score=req.risk_score,
        snippet=req.snippet,
        relation=req.relation or "Relative"
    )

@app.get("/api/family-alert/history")
def get_family_alerts_history():
    """Retrieve history of dispatched family alerts."""
    return get_alert_history()

@app.get("/api/scam-feed")
def get_scam_feed_endpoint():
    """Returns live national scam intelligence feed."""
    return get_national_scam_feed()

@app.get("/api/samples")
def get_test_samples():
    """Returns ready-to-test sample scenarios for evaluators & judges."""
    return {
        "messages": [
            {
                "id": "sbi_kyc",
                "title": "SBI / YONO KYC Expiry",
                "title_hi": "एसबीआई फर्जी केवाईसी",
                "type": "Fake KYC Phishing",
                "text": "Dear Customer, Your SBI YONO NetBanking has been blocked due to pending KYC verification. Please click https://sbi-kyc-update.xyz to verify your PAN card within 24 hours to avoid permanent deactivation."
            },
            {
                "id": "electricity_threat",
                "title": "Electricity Bill Cutoff Threat",
                "title_hi": "बिजली बिल डिस्कनेक्शन धमकी",
                "type": "Urgency & Utility Scam",
                "text": "URGENT NOTICE: Your electricity connection will be disconnected tonight at 9:30 PM from the power sub-station because your previous bill was not updated. Contact Electricity Officer immediately at 9876543210."
            },
            {
                "id": "youtube_job",
                "title": "Telegram YouTube Like Job",
                "title_hi": "टेलीग्राम पार्ट टाइम जॉब स्कैम",
                "type": "Task / Ponzi Fraud",
                "text": "Hi! We offer Part-Time Work From Home. Earn ₹3,000 to ₹8,000 daily just by liking YouTube videos and rating hotels on Google. Join our VIP Telegram channel: https://t.me/quickcash_earn_india."
            },
            {
                "id": "genuine_salary",
                "title": "Genuine Bank Salary Credit",
                "title_hi": "वास्तविक बैंक सैलरी क्रेडिट",
                "type": "Safe Transaction",
                "text": "Your A/C ending with 4821 is credited with INR 68,500.00 on 27-Oct-2026 by NEFT salary transfer. Available balance: INR 84,210.50. Never share your OTP or PIN with anyone - HDFC Bank."
            }
        ],
        "calls": get_sample_call_presets(),
        "screenshots": get_screenshot_presets()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
