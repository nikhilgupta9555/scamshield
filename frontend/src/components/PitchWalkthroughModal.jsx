import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Shield, AlertTriangle, Cpu, Sparkles, 
  Users, CheckCircle2, Award, Zap, PhoneCall, Layers 
} from 'lucide-react';

const SLIDES = [
  {
    title: 'Problem Statement',
    subtitle: 'Online and phone scams are growing faster than people can spot them.',
    tag: 'The Crisis',
    bullets: [
      { heading: 'Convincing Fake Messages', text: 'Fake KYC, UPI, job, and parcel messages look identical to genuine bank alerts, while "digital arrest" calls create instant panic.' },
      { heading: 'No Instant Verification', text: 'Citizens have no 5-second check before they click a link, authorize payment, or read out an OTP.' },
      { heading: 'Irreversible Heavy Losses', text: 'Victims lose life savings within 15 minutes. Reporting to banks often happens too late.' },
      { heading: 'Who Is Affected', text: 'Elderly citizens, first-time internet users, students, and middle-class families across all regions.' }
    ]
  },
  {
    title: 'Proposed Solution & Key Features',
    subtitle: 'ScamShield provides multi-modal real-time fraud defense in simple Hindi & English.',
    tag: 'The Innovation',
    bullets: [
      { heading: 'Multi-Input Scam Check', text: 'Single unified interface for text messages, screenshots (OCR), and voice calls (speech-to-text).' },
      { heading: 'Plain-Language Red Flag Explainer', text: 'Explains exactly WHY a message is risky: artificial urgency, spoofed headers, extortion threats.' },
      { heading: 'Integrated Action Guide', text: 'Gives immediate Dos and Don’ts, direct click-to-call 1930 Cyber Helpline, and portal reporting.' },
      { heading: 'Family Protection Mode (Family Shield)', text: 'Sends an emergency WhatsApp SOS alert to a son, daughter, or spouse before money is lost.' }
    ]
  },
  {
    title: 'Workflow & Tech Stack',
    subtitle: 'End-to-end 5-step detection pipeline optimized for sub-second response times.',
    tag: 'Architecture',
    bullets: [
      { heading: '1. Multi-Input Ingestion', text: 'Text, image screenshot upload, or voice call audio recording stream.' },
      { heading: '2. Vision OCR & Speech Engine', text: 'Fast text recognition for deceptive payment slips and audio transcription for call threats.' },
      { heading: '3. Scam & Link Reputation Engine', text: 'Detects typosquatting, lookalike domains (.xyz), emotional manipulation, and impersonation.' },
      { heading: '4. Tech Stack', text: 'Frontend: React 18 + Tailwind CSS. Backend: Python FastAPI. AI/NLP: Hybrid Rule + LLM Heuristics.' }
    ]
  },
  {
    title: 'USP & Competitive Edge',
    subtitle: 'Why ScamShield outperforms existing SMS filters and spam blockers.',
    tag: 'Unfair Advantage',
    bullets: [
      { heading: 'Handles Calls & Screenshots', text: 'Covers voice-call scams like Digital Arrest and fake UPI slips, not just plain SMS text.' },
      { heading: 'Protects, Not Just Detects', text: 'Provides legal facts (e.g. Digital Arrest does not exist in law) and direct action steps.' },
      { heading: 'Family Shield for the Vulnerable', text: 'Empowers families to safeguard elderly parents from aggressive extortion.' },
      { heading: 'Zero Barrier & Frictionless', text: 'Works on any smartphone browser without requiring app store downloads or sign-ups.' }
    ]
  },
  {
    title: 'Impact & Road Ahead',
    subtitle: 'Empowering India’s next billion digital citizens with trusted security.',
    tag: 'Vision & Scale',
    bullets: [
      { heading: 'Immediate Crime Prevention', text: 'Stops fraud at the psychological trigger before money leaves the bank account.' },
      { heading: 'Inclusive Hindi & English UI', text: 'Democratizes cyber-defense for users of all digital literacy levels.' },
      { heading: 'Scalable for Telecoms & Banks', text: 'API can plug directly into telecom SMS gateways, banking apps, and state cyber cells.' },
      { heading: 'Next Steps', text: 'WhatsApp bot integration, 10+ regional Indian languages, and shared scam-intelligence API.' }
    ]
  }
];

export default function PitchWalkthroughModal({ isOpen, onClose, language }) {
  if (!isOpen) return null;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0e1526] border border-indigo-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 glow-shield-blue">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Slide Counter & Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-bold">
              Team BrainByte • Pitch Deck ({currentSlide + 1}/5)
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
            {slide.tag}
          </span>
        </div>

        {/* Slide Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {slide.subtitle}
          </p>
        </div>

        {/* Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {slide.bullets.map((b, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#080d19] border border-slate-800/80 space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{b.heading}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed pl-5">
                {b.text}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Dots & Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex space-x-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className={`p-2 rounded-lg border text-xs flex items-center space-x-1 ${
                currentSlide === 0
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentSlide < SLIDES.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => Math.min(SLIDES.length - 1, prev + 1))}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-1 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                Launch Live App
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
