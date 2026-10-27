import random
from typing import Dict, Any

# Mock/Live weather service for hyper-local agricultural advisory
CROP_WATER_REQUIREMENTS = {
    "wheat": {"min_temp": 15, "max_temp": 25, "water_needed_mm": 4.5},
    "rice": {"min_temp": 20, "max_temp": 35, "water_needed_mm": 8.0},
    "cotton": {"min_temp": 21, "max_temp": 32, "water_needed_mm": 6.0},
    "maize": {"min_temp": 18, "max_temp": 30, "water_needed_mm": 5.0},
    "sugarcane": {"min_temp": 20, "max_temp": 38, "water_needed_mm": 9.0},
    "mustard": {"min_temp": 10, "max_temp": 25, "water_needed_mm": 3.5},
    "potato": {"min_temp": 15, "max_temp": 24, "water_needed_mm": 4.0},
    "tomato": {"min_temp": 18, "max_temp": 29, "water_needed_mm": 5.2}
}

def get_hyperlocal_weather(location: str = "Punjab, India", crop: str = "wheat") -> Dict[str, Any]:
    """Generates hyper-local weather telemetry and smart irrigation alert."""
    crop_lower = crop.lower()
    crop_data = CROP_WATER_REQUIREMENTS.get(crop_lower, CROP_WATER_REQUIREMENTS["wheat"])
    
    # Simulating hyper-local weather sensors + satellite telemetries
    temp_c = 26.5
    humidity = 62
    wind_speed_kmh = 12.4
    rainfall_prob = 15
    soil_moisture_pct = 38 # % volumetric water content
    solar_radiation = "18.5 MJ/m²"
    
    # Calculate evapotranspiration (ET0) & irrigation recommendation
    water_deficit = max(0.0, crop_data["water_needed_mm"] - (soil_moisture_pct * 0.1))
    
    if soil_moisture_pct < 40 and rainfall_prob < 30:
        irrigation_advice = f"Irrigate field with {water_deficit:.1f} mm water today evening to avoid moisture stress."
        irrigation_status = "Action Needed"
        urgency = "high"
    elif rainfall_prob >= 60:
        irrigation_advice = "Heavy rainfall expected within 24h. Hold irrigation & ensure proper field drainage."
        irrigation_status = "Hold Irrigation"
        urgency = "medium"
    else:
        irrigation_advice = "Soil moisture level is optimal. No irrigation required today."
        irrigation_status = "Optimal"
        urgency = "low"
        
    return {
        "location": location,
        "temperature_c": temp_c,
        "humidity_pct": humidity,
        "wind_speed_kmh": wind_speed_kmh,
        "rainfall_probability_pct": rainfall_prob,
        "soil_moisture_pct": soil_moisture_pct,
        "solar_radiation": solar_radiation,
        "crop": crop.capitalize(),
        "irrigation_recommendation": {
            "status": irrigation_status,
            "advice": irrigation_advice,
            "urgency": urgency,
            "water_deficit_mm": round(water_deficit, 1),
            "best_time_to_water": "5:30 PM - 7:00 PM"
        },
        "forecast_3day": [
            {"day": "Today", "temp": "27°C", "condition": "Sunny / Partly Cloudy", "rain": "15%"},
            {"day": "Tomorrow", "temp": "28°C", "condition": "Clear Sky", "rain": "5%"},
            {"day": "Day 3", "temp": "25°C", "condition": "Light Showers", "rain": "45%"}
        ]
    }
