import os
import json
from typing import Dict, Any, List

# Multilingual agronomic knowledge base & prompt templates
SUPPORTED_LANGUAGES = {
    "hi": "Hindi (हिंदी)",
    "en": "English",
    "pa": "Punjabi (ਪੰਜਾਬੀ)",
    "mr": "Marathi (मराठी)",
    "te": "Telugu (తెలుగు)",
    "ta": "Tamil (தமிழ்)",
    "gu": "Gujarati (ગુજરાતી)"
}

LOCALIZED_FALLBACK_ANSWERS = {
    "hi": {
        "fertilizer": "गेहूं/धान की फसल के लिए: बुआई के समय 50 किग्रा DAP + 20 किग्रा यूरिया प्रति एकड़ दें। पहली सिंचाई पर 30 किग्रा यूरिया का छिड़काव करें।",
        "irrigation": "वर्तमान मौसम को देखते हुए शाम के समय हल्की सिंचाई करें। अत्यधिक पानी भरने से बचें ताकि जड़ों में सड़न न हो।",
        "weather": "अगले 24-48 घंटों में हल्की धूप और मध्यम नमी रहेगी। कीटनाशक छिड़काव के लिए सुबह का समय सबसे उपयुक्त है।",
        "default": "नमस्ते! मैं स्मार्ट एग्री-कोपायलट हूँ। आपकी फसल, मौसम, सिंचाई या बीमारी संबंधी प्रश्न का सटीक कृषि वैज्ञानिक उत्तर देने के लिए तैयार हूँ।"
    },
    "en": {
        "fertilizer": "For optimal crop yield, apply 50 kg DAP + 20 kg Urea per acre during sowing. Top dress with 30 kg Urea after 1st irrigation.",
        "irrigation": "Based on hyper-local soil moisture sensors, light irrigation is recommended during late afternoon.",
        "weather": "Partly cloudy with 26°C temperature. Wind speed is 12 km/h. Ideal condition for crop monitoring.",
        "default": "Hello! I am Smart AgriCopilot, your digital agronomist. How can I assist you with crop health, irrigation, or weather today?"
    }
}

def ask_agri_copilot(query: str, language: str = "hi", crop_context: str = "Wheat") -> Dict[str, Any]:
    """Provides voice/text conversational AI advice for farmers in vernacular languages."""
    query_lower = query.lower()
    lang_code = language if language in LOCALIZED_FALLBACK_ANSWERS else "en"
    
    # Try calling Google Gemini API if key is set
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    ai_response = None
    
    if gemini_key:
        try:
            from google import genai
            client = genai.Client(api_key=gemini_key)
            system_instruction = f"""
            You are 'Smart AgriCopilot', an expert AI Agronomist designed for Indian smallholder farmers.
            Provide actionable, precise, empathetic advice on agriculture, weather, soil health, irrigation, and pest control.
            Language: Respond in {SUPPORTED_LANGUAGES.get(language, 'Hindi')}.
            Crop Context: {crop_context}.
            Keep response concise, bulleted, easy to understand for farmers, and mention organic & low-cost solutions first.
            """
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=f"{system_instruction}\n\nFarmer Query: {query}"
            )
            if response and response.text:
                ai_response = response.text
        except Exception as e:
            print(f"Gemini API call exception: {e}")

    if not ai_response:
        # Fallback intelligent responder based on keywords
        answers = LOCALIZED_FALLBACK_ANSWERS.get(lang_code, LOCALIZED_FALLBACK_ANSWERS["en"])
        if "खाद" in query_lower or "fertilizer" in query_lower or "dap" in query_lower or "urea" in query_lower:
            ai_response = answers["fertilizer"]
        elif "पानी" in query_lower or "सिंचाई" in query_lower or "irrigation" in query_lower or "water" in query_lower:
            ai_response = answers["irrigation"]
        elif "मौसम" in query_lower or "weather" in query_lower or "rain" in query_lower or "बारिश" in query_lower:
            ai_response = answers["weather"]
        else:
            ai_response = f"{answers['default']}\n\n• फसल: {crop_context}\n• सलाह: मृदा स्वास्थ्य कार्ड के अनुसार संतुलित N-P-K खाद का प्रयोग करें।"

    return {
        "query": query,
        "language": language,
        "language_name": SUPPORTED_LANGUAGES.get(language, "Hindi"),
        "crop_context": crop_context,
        "response_text": ai_response,
        "audio_synthesis_url": None, # Frontend handles SpeechSynthesis API natively for offline voice playback
        "suggested_actions": [
            "Check Hyper-local Weather Alert",
            "Scan Plant Leaf for Disease",
            "View PM-KISAN Benefit Status"
        ]
    }
