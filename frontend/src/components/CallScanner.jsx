import React, { useState, useEffect } from 'react';
import { PhoneCall, Play, Pause, AlertOctagon, ShieldAlert, Radio, Volume2, Info } from 'lucide-react';

const CALL_PRESETS = [
  {
    id: 'digital_arrest_sample',
    title: 'Mumbai Crime Branch Digital Arrest Threat',
    title_hi: 'मुंबई पुलिस / फेडेक्स पार्सल डिजिटल अरेस्ट धमकी',
    caller: '+91 22 2262 0111 (Spoofed Police CLI)',
    duration: '01:42',
    transcript: `[00:02] Caller: Hello, this is Inspector Rathore calling from Mumbai Crime Branch Headquarters.
[00:15] Caller: Your Aadhaar card ending in 8912 has been found linked to a suspicious FedEx package containing 140 grams of MDMA narcotics and 5 fake passports sent to Cambodia.
[00:34] Caller: A Non-Bailable Arrest Warrant (NBW) has been issued against you under Section 420 and NDPS Act.
[00:52] Caller: You are placed under immediate 'Digital Arrest'. You must keep your WhatsApp video call on for the next 4 hours. Do not speak to your family or lawyer, as this case is classified under National Security.
[01:18] Caller: To verify your financial innocence, the Supreme Court requires an asset verification deposit. Transfer ₹2,50,000 to the Reserve Bank of India clearance escrow account immediately. Once audited, it will be refunded.`,
    highlights: [
      { time: '[00:02]', text: 'Inspector Rathore, Mumbai Crime Branch', type: 'Impersonation' },
      { time: '[00:15]', text: 'MDMA narcotics & fake passports', type: 'False Accusation Panic' },
      { time: '[00:52]', text: "Placed under immediate 'Digital Arrest' on video call", type: 'Illegal Extortion Tactic' },
      { time: '[01:18]', text: 'Transfer ₹2,50,000 to clearance escrow account', type: 'Extortion Demand' }
    ]
  },
  {
    id: 'bank_kyc_call',
    title: 'Urgent Bank KYC Suspension Call',
    title_hi: 'बैंक खाता बंद करने की फर्जी कॉल',
    caller: '+91 98210 49182 (Private Number)',
    duration: '01:05',
    transcript: `[00:02] Caller: Namaste, I am calling from SBI Card Security Division.
[00:12] Caller: Sir, your ATM card will be blocked in 10 minutes because your Aadhaar KYC is pending.
[00:26] Caller: I have sent a 6-digit one-time password to your phone. Tell me the OTP immediately so I can stop the card block.`,
    highlights: [
      { time: '[00:12]', text: 'ATM card blocked in 10 minutes', type: 'Artificial Urgency' },
      { time: '[00:26]', text: 'Tell me the OTP immediately', type: 'Credential Harvesting' }
    ]
  }
];

export default function CallScanner({ onScan, isScanning, language }) {
  const [selectedCall, setSelectedCall] = useState(CALL_PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [customTranscript, setCustomTranscript] = useState(CALL_PRESETS[0].transcript);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 4));
      }, 400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSelectCall = (call) => {
    setSelectedCall(call);
    setCustomTranscript(call.transcript);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleAnalyze = () => {
    onScan({
      type: 'call',
      text: customTranscript
    });
  };

  return (
    <div className="space-y-5">
      
      {/* Call selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hi' ? 'कॉल रिकॉर्डिंग परिदृश्य चुनें:' : 'Select Call Audio Scenario:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CALL_PRESETS.map((call) => {
            const isSelected = selectedCall.id === call.id;
            return (
              <button
                key={call.id}
                type="button"
                onClick={() => handleSelectCall(call)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-rose-950/20 border-rose-500/70 shadow-lg shadow-rose-950/20'
                    : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Radio className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
                    {language === 'hi' ? call.title_hi : call.title}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{call.duration}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Caller: {call.caller}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulated Audio Waveform & Player */}
      <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/25 transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div>
              <p className="text-sm font-semibold text-white">{selectedCall.title}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                {isPlaying ? (language === 'hi' ? 'ऑडियो प्ले हो रहा है...' : 'Playing extracted audio stream...') : (language === 'hi' ? 'कॉल ऑडियो तैयार है' : 'Speech-to-Text Audio Loaded')}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
            {selectedCall.duration}
          </span>
        </div>

        {/* Audio Waveform Graphic */}
        <div className="h-14 bg-[#070a12] rounded-xl flex items-center px-4 space-x-1 overflow-hidden border border-slate-800/80">
          {[40, 65, 80, 45, 95, 30, 75, 100, 50, 70, 85, 35, 60, 90, 40, 75, 55, 95, 30, 80, 65, 45, 85, 90, 40, 70, 50, 90, 60, 40, 75, 30, 85, 65, 50, 95, 40, 70, 85, 30].map((h, i) => {
            const isPassed = (i / 40) * 100 <= progress;
            return (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-full transition-all duration-150 ${
                  isPassed
                    ? 'bg-gradient-to-t from-rose-500 to-amber-400'
                    : 'bg-slate-700/50'
                }`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Critical Legal Awareness Alert for Digital Arrest */}
      <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-start space-x-3">
        <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-rose-300">
            {language === 'hi' ? 'कानूनी चेतावनी: "डिजिटल अरेस्ट" पूरी तरह फर्जी है!' : 'CRITICAL LEGAL TRUTH: "Digital Arrest" is 100% FRAUD!'}
          </p>
          <p className="text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'भारतीय कानून में डिजिटल अरेस्ट का कोई नियम नहीं है। कोई भी पुलिस, सीबीआई, कोर्ट या कस्टम विभाग वीडियो कॉल पर किसी को हिरासत में नहीं लेता और न ही "वेरिफिकेशन खाते" में पैसे मांगता है।'
              : 'There is NO provision for "Digital Arrest" under Indian Law. Law enforcement agencies (Police, CBI, ED, Courts) NEVER place citizens in video custody or ask for funds to be transferred to verification accounts.'}
          </p>
        </div>
      </div>

      {/* Live Transcript View */}
      <div className="bg-[#0b101d] rounded-xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {language === 'hi' ? 'कॉल का लाइव ट्रांसक्रिप्ट (स्पीच-टू-टेक्स्ट):' : 'Call Speech-to-Text Transcript:'}
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Speech AI v2.4
          </span>
        </div>

        <textarea
          rows={6}
          value={customTranscript}
          onChange={(e) => setCustomTranscript(e.target.value)}
          className="w-full bg-[#070a12] border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-rose-500 resize-none leading-relaxed"
        />

        {selectedCall.highlights && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'hi' ? 'पहचाने गए खतरे के बिंदु:' : 'Flagged Coercive Markers:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCall.highlights.map((h, i) => (
                <div key={i} className="text-xs p-2 rounded-lg bg-rose-500/5 border border-rose-500/20 flex items-start space-x-2">
                  <span className="font-mono text-rose-400 text-[10px] font-bold">{h.time}</span>
                  <div>
                    <p className="text-slate-200 font-medium">{h.text}</p>
                    <span className="text-[10px] text-amber-400 font-semibold">{h.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!customTranscript.trim() || isScanning}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center space-x-2"
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{language === 'hi' ? 'कॉल का विश्लेषण हो रहा है...' : 'Analyzing Call Fraud...'}</span>
            </>
          ) : (
            <>
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'hi' ? 'कॉल फ्रॉड का विश्लेषण करें' : 'Analyze Call Audio'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
