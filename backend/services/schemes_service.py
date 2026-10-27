from typing import List, Dict, Any

GOVT_SCHEMES = [
    {
        "id": "pm-kisan",
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "benefit": "₹6,000 per year directly transferred in 3 equal installments into farmer bank accounts.",
        "eligibility": "Small and marginal farmers holding cultivable land.",
        "agristack_integration": "Linked via Farmer ID & e-KYC integration.",
        "status": "Active / Next Installment Eligible",
        "action_link": "https://pmkisan.gov.in"
    },
    {
        "id": "pmfby",
        "name": "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
        "benefit": "Comprehensive crop insurance covering yield loss due to non-preventable natural risks.",
        "eligibility": "All farmers growing notified crops in notified areas.",
        "agristack_integration": "Satellite geo-fencing yield assessment integration.",
        "status": "Kharif & Rabi Season Open",
        "action_link": "https://pmfby.gov.in"
    },
    {
        "id": "shc",
        "name": "Soil Health Card Scheme (Krishi DSS)",
        "benefit": "Free soil testing card providing N-P-K & micronutrient status with fertilizer recommendations.",
        "eligibility": "All agricultural landowners across Indian states.",
        "agristack_integration": "Digital Soil Registry synced with land parcel GIS map.",
        "status": "Report Ready for Download",
        "action_link": "https://soilhealth.dac.gov.in"
    },
    {
        "id": "kcc",
        "name": "Kisan Credit Card (KCC)",
        "benefit": "Concessional institutional credit up to ₹3 Lakh at low interest rates (4% effective).",
        "eligibility": "Farmers, tenant farmers, sharecroppers, self-help groups.",
        "agristack_integration": "Instant e-verification via AgriStack digitised land records.",
        "status": "Pre-approved Limit Available",
        "action_link": "https://agristack.gov.in"
    }
]

def get_government_schemes() -> List[Dict[str, Any]]:
    """Returns government schemes and Digital India AgriStack integrations."""
    return GOVT_SCHEMES
