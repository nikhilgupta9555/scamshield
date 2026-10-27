/**
 * BrainByte ScamShield - Dual Engine (Client-side Fallback + FastAPI Backend Connector)
 * Ensures 100% working prototype functionality whether running with FastAPI or standalone on Vercel/GitHub Pages.
 */

const API_BASE_URL = 'http://localhost:8000';

export const SAMPLE_PRESETS = [
  {
    id: 'digital_arrest',
    category: 'call',
    label: '🚨 Digital Arrest Call',
    label_hi: '🚨 डिजिटल अरेस्ट कॉल',
    badge: 'Voice Fraud',
    title: 'Mumbai Crime Branch Digital Arrest Threat',
    text: `[00:02] Caller: Hello, this is Inspector Rathore calling from Mumbai Crime Branch Headquarters.
[00:15] Caller: Your Aadhaar card ending in 8912 has been found linked to a suspicious FedEx package containing 140 grams of MDMA narcotics and 5 fake passports sent to Cambodia.
[00:34] Caller: A Non-Bailable Arrest Warrant (NBW) has been issued against you under Section 420 and NDPS Act.
[00:52] Caller: You are placed under immediate 'Digital Arrest'. You must keep your WhatsApp video call on for the next 4 hours. Do not speak to your family or lawyer, as this case is classified under National Security.
[01:18] Caller: To verify your financial innocence, the Supreme Court requires an asset verification deposit. Transfer ₹2,50,000 to the Reserve Bank of India clearance escrow account immediately. Once audited, it will be refunded.`,
    audioDuration: '01:42'
  },
  {
    id: 'sbi_kyc',
    category: 'message',
    label: '💳 SBI Fake KYC SMS',
    label_hi: '💳 एसबीआई फर्जी केवाईसी',
    badge: 'SMS Phishing',
    title: 'Fake SBI YONO NetBanking Suspension',
    text: 'Dear Customer, Your SBI YONO NetBanking account will be blocked within 24 hours due to expired KYC verification. Please click https://sbi-kyc-update.xyz to verify your PAN card immediately to avoid ₹5,000 penalty.'
  },
  {
    id: 'electricity_bill',
    category: 'message',
    label: '⚡ Electricity Bill Cutoff',
    label_hi: '⚡ बिजली डिस्कनेक्शन धमकी',
    badge: 'Urgency Scam',
    title: 'Electricity Power Disconnection Tonight',
    text: 'URGENT NOTICE: Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the power sub-station because your previous month bill was not updated. Immediately call Electricity Officer at 9876543210.'
  },
  {
    id: 'telegram_job',
    category: 'message',
    label: '💼 Telegram Job Scam',
    label_hi: '💼 टेलीग्राम जॉब स्कैम',
    badge: 'Task Ponzi',
    title: 'Like YouTube Videos & Earn ₹5000 Daily',
    text: 'Hi! We offer Part-Time Work From Home. Earn ₹3,000 to ₹8,000 daily just by liking YouTube videos and rating hotels on Google. Join our VIP Telegram channel: https://t.me/quickcash_earn_india. First payout guaranteed.'
  },
  {
    id: 'safe_bank_sms',
    category: 'message',
    label: '✅ Genuine Bank SMS',
    label_hi: '✅ वास्तविक बैंक संदेश',
    badge: 'Verified Safe',
    title: 'Legitimate Salary Credit Alert',
    text: 'Your A/C ending with 4821 is credited with INR 68,500.00 on 27-Oct-2026 by NEFT salary transfer from Infosys Ltd. Available balance: INR 84,210.50. Never share your OTP or PIN with anyone - HDFC Bank.'
  }
];

export const LIVE_SCAM_FEED = [
  {
    id: 'ALERT-DELHI-01',
    city: 'New Delhi',
    type: 'Digital Arrest / FedEx Parcel',
    reports: 342,
    threat: 'CRITICAL',
    desc: 'Fraudsters impersonating CBI and Mumbai Police extortion on WhatsApp video call.',
    desc_hi: 'सीबीआई और मुंबई पुलिस के नाम से व्हाट्सएप वीडियो कॉल पर वसूली।'
  },
  {
    id: 'ALERT-MUMBAI-02',
    city: 'Mumbai',
    type: 'Fake Electricity Disconnection',
    reports: 819,
    threat: 'HIGH',
    desc: 'SMS threatening power disconnection at 9:30 PM with APK malware link.',
    desc_hi: 'रात 9:30 बजे बिजली काटने का फर्जी एसएमएस और खतरनाक ऐप लिंक।'
  },
  {
    id: 'ALERT-BLR-03',
    city: 'Bengaluru',
    type: 'Telegram Part-Time Rating Job',
    reports: 624,
    threat: 'HIGH',
    desc: 'Luring tech professionals into crypto task deposits via fake hotel reviews.',
    desc_hi: 'होटल रिव्यू के नाम पर फर्जी क्रिप्टो टास्क डिपॉजिट स्कैम।'
  },
  {
    id: 'ALERT-PAN-04',
    city: 'Pan-India',
    type: 'YONO SBI PAN Expiry Phishing',
    reports: 1240,
    threat: 'CRITICAL',
    desc: 'Deceptive SMS targeting bank account holders with `.xyz` lookalike links.',
    desc_hi: 'एसबीआई बैंक खाताधारकों को निशाना बनाने वाला फर्जी पैन अपडेट एसएमएस।'
  }
];

export async function analyzeScam(payload) {
  const { type, text, url, imageText, language } = payload;
  
  // Try FastAPI backend first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for fast fallback

    let endpoint = `${API_BASE_URL}/api/scan/text`;
    let body = { text, language: language || 'en' };

    if (type === 'call') {
      endpoint = `${API_BASE_URL}/api/scan/call`;
      body = { transcript: text, language: language || 'en' };
    } else if (type === 'link') {
      endpoint = `${API_BASE_URL}/api/scan/link`;
      body = { url: url || text, language: language || 'en' };
    } else if (type === 'screenshot') {
      endpoint = `${API_BASE_URL}/api/scan/screenshot`;
      const formData = new FormData();
      formData.append('extracted_text', imageText || text);
      formData.append('language', language || 'en');
      
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return await res.json();
      }
    }

    if (type !== 'screenshot') {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (err) {
    // Backend offline or running in standalone mode - proceed with client-side engine
    console.log('[ScamShield] Operating in high-speed client-side mode');
  }

  // Client-side Heuristic Engine
  return runClientSideAnalysis(payload);
}

function runClientSideAnalysis({ type, text, url, imageText }) {
  const content = (text || url || imageText || '').toLowerCase();
  
  let riskScore = 0;
  const redFlags = [];
  const urls = content.match(/https?:\/\/[^\s<>"]+|www\.[^\s<>"]+/g) || [];

  // Whitelist check
  const isSafeSMS = content.includes('credited with inr') || content.includes('salary transfer') || (content.includes('available balance') && !urls.length);
  const hasNeverShare = content.includes('never share') || content.includes('do not share');

  // Check 1: Digital Arrest / Authority Impersonation
  if (content.includes('digital arrest') || content.includes('crime branch') || content.includes('cbi') || content.includes('inspector') || content.includes('police')) {
    riskScore += 45;
    redFlags.push({
      category: 'impersonation',
      tag: 'Police / CBI / Authority Impersonation',
      tag_hi: 'पुलिस / सीबीआई अधिकारी का फर्जी ढोंग',
      severity: 'critical',
      explanation: 'Caller or message falsely claims to represent police or judicial authorities to intimidate you.',
      explanation_hi: 'संदेश या कॉलर खुद को पुलिस या सरकारी अधिकारी बताकर आपको डरा रहा है।'
    });
  }

  // Check 2: Digital Arrest specific coercive tactics
  if (content.includes('video call') || content.includes('digital custody') || content.includes('escrow') || content.includes('verification account') || content.includes('mdma') || content.includes('narcotics')) {
    riskScore += 40;
    redFlags.push({
      category: 'coercion',
      tag: 'Coercive Digital Arrest Extortion',
      tag_hi: 'फर्जी डिजिटल अरेस्ट रंगदारी',
      severity: 'critical',
      explanation: 'Indian Law has NO concept of Digital Arrest. Police never arrest people on video calls or demand money.',
      explanation_hi: 'भारतीय कानून में डिजिटल अरेस्ट का कोई नियम नहीं है। पुलिस कभी वीडियो कॉल पर अरेस्ट नहीं करती।'
    });
  }

  // Check 3: Urgency & Panic Tactics
  if (content.includes('immediately') || content.includes('within 24 hours') || content.includes('blocked') || content.includes('disconnected') || content.includes('tonight at 9:30') || content.includes('penalty')) {
    riskScore += 30;
    redFlags.push({
      category: 'urgency',
      tag: 'Artificial Panic & Extreme Urgency',
      tag_hi: 'नकली घबराहट और तुरंत कार्रवाई का दबाव',
      severity: 'high',
      explanation: 'Creates intense panic (threatens power cutoff or bank freeze) to force compliance without checking.',
      explanation_hi: 'बिजली कटने या खाता बंद होने का डर दिखाकर बिना सोचे पैसे ऐंठने का प्रयास है।'
    });
  }

  // Check 4: Suspicious Links & Masked Domains
  if (urls.some(u => u.includes('.xyz') || u.includes('.top') || u.includes('t.me') || u.includes('bit.ly') || u.includes('tinyurl') || u.includes('update-kyc'))) {
    riskScore += 35;
    redFlags.push({
      category: 'links',
      tag: 'Phishing / Masked Web Link',
      tag_hi: 'फर्जी या संदिग्ध फिशिंग लिंक',
      severity: 'critical',
      explanation: 'Contains suspicious domain extension (.xyz, .top, Telegram) imitating official services.',
      explanation_hi: 'संदेश में फर्जी वेबसाइट लिंक है जो आपका पासवर्ड या बैंक विवरण चुरा सकता है।'
    });
  }

  // Check 5: KYC / OTP / Remote app downloads
  if (content.includes('kyc') || content.includes('otp') || content.includes('pan card') || content.includes('apk') || content.includes('anydesk')) {
    riskScore += 30;
    redFlags.push({
      category: 'credentials',
      tag: 'KYC & Credential Harvesting',
      tag_hi: 'केवाईसी और गुप्त जानकारी की चोरी',
      severity: 'high',
      explanation: 'Demands sensitive documents, KYC updates via external link, or OTP sharing.',
      explanation_hi: 'आपसे गुप्त दस्तावेज, पासवर्ड या खतरनाक ऐप डाउनलोड कराने की कोशिश की जा रही है।'
    });
  }

  // Check 6: Job / Ponzi / High Returns
  if (content.includes('part-time') || content.includes('earn') || content.includes('liking youtube') || content.includes('daily') || content.includes('payout')) {
    riskScore += 30;
    redFlags.push({
      category: 'financial',
      tag: 'Telegram Task / Ponzi Job Fraud',
      tag_hi: 'फर्जी पार्ट-टाइम टास्क जॉब स्कैम',
      severity: 'high',
      explanation: 'Promises unrealistic easy money for liking videos, followed by trapped deposit scams.',
      explanation_hi: 'वीडियो लाइक करके पैसे कमाने का लालच देकर बाद में भारी पैसे ऐंठने का स्कैम।'
    });
  }

  if (isSafeSMS && hasNeverShare) {
    riskScore = 5;
    redFlags.length = 0;
  }

  const finalScore = Math.min(100, Math.max(0, riskScore));
  let verdict = 'SAFE';
  let verdict_label = 'SAFE: Normal Advisory or Notification';
  let verdict_label_hi = 'सुरक्षित: सामान्य आधिकारिक सूचना';
  let theme = 'emerald';

  if (finalScore >= 70) {
    verdict = 'SCAM';
    verdict_label = 'HIGH-RISK SCAM DETECTED';
    verdict_label_hi = 'खतरनाक धोखाधड़ी (हाई रिस्क स्कैम)';
    theme = 'crimson';
  } else if (finalScore >= 35) {
    verdict = 'SUSPICIOUS';
    verdict_label = 'SUSPICIOUS: Unverified Message';
    verdict_label_hi = 'संदिग्ध संदेश: सावधानी बरतें';
    theme = 'amber';
  }

  return {
    risk_score: finalScore,
    verdict,
    verdict_label,
    verdict_label_hi,
    theme,
    is_digital_arrest: content.includes('digital arrest') || (content.includes('police') && content.includes('video call')),
    red_flags: redFlags,
    detected_links: urls,
    legal_fact: 'CRITICAL FACT: Indian law enforcement agencies (Police, CBI, ED) DO NOT conduct "Digital Arrests". They never arrest suspects over Skype or WhatsApp, nor do they ask for funds to be transferred for audit.',
    legal_fact_hi: 'महत्वपूर्ण कानूनी तथ्य: भारतीय कानून में "डिजिटल अरेस्ट" का कोई प्रावधान नहीं है। पुलिस या सीबीआई कभी भी व्हाट्सएप या स्काइप पर गिरफ्तारी नहीं करती और न ही पैसे मांगती है।',
    action_guide: {
      summary: verdict === 'SCAM' ? 'Strong fraud tactics identified. Do NOT click any link or send money.' : 'Stay alert and always verify unsolicited requests.',
      summary_hi: verdict === 'SCAM' ? 'धोखाधड़ी के गंभीर संकेत मिले हैं। किसी लिंक पर क्लिक न करें और पैसे न भेजें।' : 'हमेशा आधिकारिक संस्था से सीधे संपर्क करके ही विश्वास करें।',
      dos: [
        'Dial 1930 immediately if money has already been deducted.',
        'Report fraudulent messages to cybercrime.gov.in or Chakshu portal.',
        'Block and report the sender number immediately.',
        'Alert your family members so they stay aware.'
      ],
      donts: [
        'DO NOT click any link or download APK files.',
        'DO NOT share OTP, UPI PIN, or bank passwords with anyone.',
        'DO NOT stay on intimidating video calls claiming to be police.',
        'DO NOT transfer money to any "clearance" or "verification" account.'
      ],
      dos_hi: [
        'यदि पैसे कट चुके हैं तो तुरंत 1930 साइबर हेल्पलाइन पर कॉल करें।',
        'संदेश को cybercrime.gov.in या चक्षु पोर्टल पर रिपोर्ट करें।',
        'संदेश भेजने वाले नंबर को तुरंत ब्लॉक करें।',
        'अपने परिवार के सदस्यों को तुरंत सतर्क करें।'
      ],
      donts_hi: [
        'संदेश में दिए गए किसी भी लिंक पर बिल्कुल क्लिक न करें।',
        'किसी को भी अपना ओटीपी, यूपीआई पिन या बैंक पासवर्ड न बताएं।',
        'पुलिस का नाम लेकर डराने वाली किसी भी वीडियो कॉल पर न रहें।',
        'किसी भी "वेरिफिकेशन खाते" में पैसे ट्रांसफर न करें।'
      ]
    },
    helpline: {
      name: 'National Cyber Crime Helpline',
      number: '1930',
      portal: 'https://cybercrime.gov.in',
      hours: '24x7 Toll Free'
    }
  };
}

export function buildFamilyWhatsAppLink(trustedPhone, trustedName, victimName, scamType, riskScore, snippet) {
  const cleanPhone = trustedPhone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  
  const text = `🚨 *ScamShield Emergency Family Alert*\n\n` +
    `Dear ${trustedName || 'Family'},\n` +
    `Your family member *${victimName || 'Parent'}* just scanned a HIGH-RISK SCAM message on ScamShield!\n\n` +
    `⚠️ *Threat Level:* ${riskScore}% (CRITICAL SCAM)\n` +
    `📌 *Detected Scam Type:* ${scamType}\n` +
    `📝 *Message:* "${(snippet || '').substring(0, 100)}..."\n\n` +
    `🛡️ *Please call them immediately:* Ensure they DO NOT send money or OTP. If already transferred, dial 1930 Cybercrime Helpline.\n\n` +
    `- Sent via BrainByte ScamShield`;

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
}
