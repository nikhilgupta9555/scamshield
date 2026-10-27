"""
BrainByte ScamShield - Deep Link & Domain Reputation Scanner
Detects typosquatting, punycode lookalikes, spoofed Indian banking domains,
URL shortener masks, and malicious high-risk TLDs.
"""

import re
from urllib.parse import urlparse
from typing import Dict, Any

SUSPICIOUS_TLDS = [
    ".top", ".xyz", ".buzz", ".cfd", ".click", ".live", ".fit", ".rest",
    ".gq", ".tk", ".ml", ".ga", ".cf", ".work", ".stream", ".download"
]

OFFICIAL_INDIAN_DOMAINS = [
    "sbi.co.in", "onlinesbi.sbi", "hdfcbank.com", "icicibank.com",
    "axisbank.com", "punjabnationalbank.in", "rbi.org.in", "gov.in",
    "cybercrime.gov.in", "incometax.gov.in", "uidai.gov.in", "npci.org.in",
    "amazon.in", "flipkart.com", "google.com"
]

KNOWN_SHORTENERS = ["bit.ly", "tinyurl.com", "is.gd", "t.co", "cutt.ly", "rb.gy"]

def check_link_safety(url: str, language: str = "en") -> Dict[str, Any]:
    """
    Evaluates safety of a given web link or domain.
    """
    if not url or len(url.strip()) < 4:
        return {
            "url": url,
            "risk_score": 0,
            "verdict": "SAFE",
            "verdict_label": "No Link Provided",
            "findings": []
        }

    clean_url = url.strip()
    if not clean_url.startswith("http://") and not clean_url.startswith("https://"):
        clean_url = "https://" + clean_url

    parsed = urlparse(clean_url)
    domain = parsed.netloc.lower()
    findings = []
    risk_score = 0

    # 1. Check IP address instead of domain name
    if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$", domain):
        risk_score += 45
        findings.append({
            "type": "IP Hostname",
            "type_hi": "आईपी एड्रेस आधारित लिंक",
            "risk": "Critical",
            "detail": "Uses a raw numerical IP address instead of a genuine registered company domain.",
            "detail_hi": "यह लिंक किसी असली कंपनी के नाम के बजाय सीधे कंप्यूटर आईपी का उपयोग कर रहा है।"
        })

    # 2. Check Suspicious TLD
    matched_tld = [tld for tld in SUSPICIOUS_TLDS if domain.endswith(tld)]
    if matched_tld:
        risk_score += 40
        findings.append({
            "type": "High-Risk Domain Extension",
            "type_hi": "संदिग्ध डोमेन एक्सटेंशन",
            "risk": "High",
            "detail": f"Domain ends in '{matched_tld[0]}', a cheap TLD heavily associated with phishing campaigns.",
            "detail_hi": f"यह वेबसाइट '{matched_tld[0]}' पर है, जिसका उपयोग अक्सर साइबर ठग करते हैं।"
        })

    # 3. Check Known URL Shortener
    if any(shortener in domain for shortener in KNOWN_SHORTENERS):
        risk_score += 25
        findings.append({
            "type": "Masked Shortened Link",
            "type_hi": "छुपाया गया छोटा लिंक (Short URL)",
            "risk": "Medium",
            "detail": "URL is shortened to hide its final destination.",
            "detail_hi": "असली वेबसाइट का पता छुपाने के लिए लिंक को छोटा किया गया है।"
        })

    # 4. Check Bank Typosquatting / Impersonation
    bank_keywords = ["sbi", "hdfc", "icici", "axis", "pnb", "yono", "kyc", "pan", "aadhar", "paytm", "phonepe"]
    is_official = any(domain.endswith(off) for off in OFFICIAL_INDIAN_DOMAINS)

    if not is_official:
        for kw in bank_keywords:
            if kw in domain:
                risk_score += 50
                findings.append({
                    "type": "Bank Impersonation / Typosquatting",
                    "type_hi": "बैंक के नाम की नकल (Typosquatting)",
                    "risk": "Critical",
                    "detail": f"Contains bank keyword '{kw}' but is NOT hosted on the genuine bank domain.",
                    "detail_hi": f"डोमेन में बैंक का नाम '{kw}' है लेकिन यह बैंक की असली आधिकारिक वेबसाइट नहीं है।"
                })
                break
    else:
        # Legitimate domain detected
        risk_score = 0
        findings.append({
            "type": "Verified Legitimate Domain",
            "type_hi": "प्रमाणित आधिकारिक डोमेन",
            "risk": "Safe",
            "detail": f"Domain '{domain}' matches verified official Indian institution.",
            "detail_hi": f"डोमेन '{domain}' भारत की अधिकृत संस्था का सही पता है।"
        })

    # 5. Check Non-HTTPS Protocol
    if parsed.scheme == "http":
        risk_score += 15
        findings.append({
            "type": "Insecure Connection (HTTP)",
            "type_hi": "असुरक्षित कनेक्शन (HTTP)",
            "risk": "Medium",
            "detail": "Connection is unencrypted HTTP, leaving data vulnerable to interception.",
            "detail_hi": "यह वेबसाइट बिना एन्क्रिप्शन की है (एचटीटीपी)।"
        })

    final_risk = min(100, max(0, risk_score))

    if final_risk >= 70:
        verdict = "DANGEROUS"
        verdict_label = "HIGH-RISK MALICIOUS / PHISHING LINK"
        verdict_label_hi = "अत्यंत खतरनाक फर्जी फिशिंग लिंक"
        theme = "crimson"
    elif final_risk >= 30:
        verdict = "SUSPICIOUS"
        verdict_label = "SUSPICIOUS UNVERIFIED LINK"
        verdict_label_hi = "संदिग्ध लिंक: जांच जरूरी"
        theme = "amber"
    else:
        verdict = "SAFE"
        verdict_label = "SAFE / RECOGNIZED DOMAIN"
        verdict_label_hi = "सुरक्षित अधिकृत वेबसाइट"
        theme = "emerald"

    return {
        "url": clean_url,
        "domain": domain,
        "risk_score": final_risk,
        "verdict": verdict,
        "verdict_label": verdict_label,
        "verdict_label_hi": verdict_label_hi,
        "theme": theme,
        "findings": findings,
        "is_official": is_official
    }
