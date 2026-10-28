import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Download, Sparkles, ShieldAlert, PhoneCall } from 'lucide-react';

const SCENES = [
  {
    pill: 'SCENE 1: THE CRISIS (0:00 - 0:25)',
    title: 'The Cyber Scam Epidemic in India',
    subtitle: 'Every day, thousands of citizens lose life savings to deceptive scams with zero instant verification.',
    narration: "Every single day in India, thousands of citizens fall victim to cyber fraud. Scammers impersonate Mumbai Police, CBI, or banks. Victims are blackmailed into 'Digital Arrest' or tricked into sharing OTPs within minutes because they have no instant way to verify. We built ScamShield by BrainByte.",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40">
          <span className="text-xs font-bold text-rose-300 block mb-1">🚨 Digital Arrest Panic</span>
          <p className="text-xs text-slate-300">Fraudsters posing as CBI/Police trap victims on video calls to extort money.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
          <span className="text-xs font-bold text-amber-300 block mb-1">💳 Fake Bank KYC & UPI</span>
          <p className="text-xs text-slate-300">Phishing URLs and fake payment slips cause irreversible financial losses.</p>
        </div>
      </div>
    )
  },
  {
    pill: 'SCENE 2: VOICE SCAMS & DIGITAL ARREST (0:25 - 0:50)',
    title: 'Voice Call & Digital Arrest Detection',
    subtitle: 'Speech-to-text transcription flags authority impersonation and panic coercion.',
    narration: "Unlike traditional spam filters, ScamShield is multi-modal. It analyzes recorded calls in real time. When a caller claims to be Mumbai Police or CBI threatening 'Digital Arrest', ScamShield flags authority impersonation and reminds the user that Indian law has no concept of Digital Arrest.",
    content: (
      <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 max-w-lg mx-auto text-left space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-rose-400">Caller: Inspector Rathore, Mumbai Police</span>
          <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-2 py-0.5 rounded">98% SCAM</span>
        </div>
        <p className="text-xs font-mono text-slate-300 italic bg-[#070b14] p-2.5 rounded border border-slate-800">
          "[00:52] You are placed under Digital Arrest... Transfer ₹2.5 Lakh to RBI clearance escrow."
        </p>
        <div className="text-xs text-rose-300 font-bold bg-rose-500/10 p-2 rounded">
          ⚠️ Legal Truth: Indian police NEVER conduct Digital Arrest or ask for money on video calls.
        </div>
      </div>
    )
  },
  {
    pill: 'SCENE 3: RED FLAGS & ACTION GUIDE (0:50 - 1:15)',
    title: 'Plain-Language Red Flags & 1930 Helpline',
    subtitle: 'Clear, jargon-free explanations in English & Hindi with direct 1-click action steps.',
    narration: "ScamShield protects, not just detects. It explains red flags in simple, plain language—both in English and Hindi. It gives clear Dos and Don'ts, and direct 1-click access to the National Cybercrime 1930 Helpline.",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
        <div className="p-3 rounded-xl bg-[#090d19] border border-rose-500/30 space-y-1">
          <span className="text-xs font-bold text-rose-400">🚩 Artificial Panic & Urgency</span>
          <p className="text-xs text-slate-300">Threatens account freeze or power cutoff to bypass critical thinking.</p>
        </div>
        <div className="p-3 rounded-xl bg-[#090d19] border border-rose-500/30 space-y-1">
          <span className="text-xs font-bold text-rose-400">🔗 Phishing Link Mask</span>
          <p className="text-xs text-slate-300">Uses lookalike domains (.xyz, .top) pretending to be official banks.</p>
        </div>
      </div>
    )
  },
  {
    pill: 'SCENE 4: FAMILY SHIELD SOS (1:15 - 1:40)',
    title: 'Family Protection Mode: Pre-Loss Alert',
    subtitle: 'Shielding elderly relatives by notifying trusted contacts before money is sent.',
    narration: "Our standout innovation is Family Protection Mode. When an elderly user encounters a high-risk scam, ScamShield can instantly send a WhatsApp SOS alert to their son, daughter, or spouse—intervening to stop financial loss before any money is transferred.",
    content: (
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 max-w-lg mx-auto text-left space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="text-xs font-bold text-emerald-400">🚨 WhatsApp Emergency Family Alert</span>
          <span className="text-[10px] font-mono text-slate-400">Sent to: Rohan (Son)</span>
        </div>
        <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#070b14] p-3 rounded-lg border border-slate-800">
          "Dear Rohan, your Dad just encountered a <b className="text-rose-400">98% Critical Scam</b>! <b>Please call him immediately</b> to ensure he does not transfer any money or share OTP."
        </p>
      </div>
    )
  },
  {
    pill: 'SCENE 5: VISION OCR & LINK CHECKER (1:40 - 1:55)',
    title: 'Screenshot OCR & Deep Domain Scanner',
    subtitle: 'Catching forged UPI payment slips and phishing domains with zero friction.',
    narration: "From fake UPI payment receipts to deceptive dot-xyz links, ScamShield operates seamlessly on any smartphone browser with zero friction.",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
        <div className="p-3 rounded-xl bg-[#090d19] border border-cyan-500/30 space-y-1">
          <span className="text-xs font-bold text-cyan-300">📸 Vision OCR Parser</span>
          <p className="text-xs text-slate-300">Analyzes screenshots of fake payment slips and counterfeit letterheads.</p>
        </div>
        <div className="p-3 rounded-xl bg-[#090d19] border border-cyan-500/30 space-y-1">
          <span className="text-xs font-bold text-cyan-300">🔗 Domain Reputation</span>
          <p className="text-xs text-slate-300">Detects typosquatting, shorteners, and fraudulent TLDs instantly.</p>
        </div>
      </div>
    )
  },
  {
    pill: 'SCENE 6: IMPACT & BRAINBYTE (1:55 - 2:00)',
    title: 'ScamShield by Team BrainByte',
    subtitle: 'Safer, inclusive and scalable cyber defense for India’s next billion digital citizens.',
    narration: "Safer, inclusive, and scalable for every digital citizen. This is ScamShield by BrainByte. Thank you!",
    content: (
      <div className="p-5 rounded-xl bg-[#0e1526] border border-indigo-500/40 max-w-md mx-auto text-center space-y-2">
        <h4 className="text-lg font-black text-white">BrainByte ScamShield</h4>
        <p className="text-xs text-indigo-300 font-mono">github.com/brainbyte/scamshield</p>
        <p className="text-xs text-slate-400">Emergency Helpline: 1930 • Built for Citizen Protection</p>
      </div>
    )
  }
];

export default function DemoVideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [currentScene, setCurrentScene] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVoiceOn, setIsVoiceOn] = useState(true);

  // Play narration whenever scene changes
  useEffect(() => {
    if (isVoiceOn && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(SCENES[currentScene].narration);
      utter.rate = 1.05;
      window.speechSynthesis.speak(utter);
    }
  }, [currentScene, isVoiceOn]);

  // Timer loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (next >= 120) {
            setCurrentScene(0);
            return 0;
          }
          if (next < 25) setCurrentScene(0);
          else if (next < 50) setCurrentScene(1);
          else if (next < 75) setCurrentScene(2);
          else if (next < 100) setCurrentScene(3);
          else if (next < 115) setCurrentScene(4);
          else setCurrentScene(5);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleClose = () => {
    setIsPlaying(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    onClose();
  };

  const jumpScene = (idx) => {
    const starts = [0, 25, 50, 75, 100, 115];
    setElapsed(starts[idx] || 0);
    setCurrentScene(idx);
  };

  const scene = SCENES[currentScene];
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="bg-[#0b101f] border border-rose-500/40 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl relative space-y-4 glow-red">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl z-20">✕</button>

        {/* Video Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                OFFICIAL DEMO
              </span>
              <span className="text-xs font-mono text-emerald-400">1080p HD • 120s Duration</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
              BrainByte ScamShield — Interactive Video Walkthrough
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                alert("📥 Demo Presentation Script downloaded! You can record your screen or upload to YouTube/Google Drive.");
                const blob = new Blob([SCENES.map((s, i) => `[SCENE ${i+1}] ${s.title}\nNarration: "${s.narration}"\n\n`).join('')], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'BrainByte_ScamShield_Demo_Script.txt';
                a.click();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Script</span>
            </button>
          </div>
        </div>

        {/* Player Canvas Frame */}
        <div className="relative w-full aspect-video bg-[#040711] rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/80">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-slate-200 font-bold">{scene.pill}</span>
            </div>
            <span className="text-slate-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700/80">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')} / 02:00
            </span>
          </div>

          <div className="my-auto space-y-3 max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{scene.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{scene.subtitle}</p>
            <div className="pt-2">{scene.content}</div>
          </div>

          <div className="bg-black/75 backdrop-blur-md rounded-xl p-3 border border-slate-800 text-center">
            <p className="text-xs sm:text-sm text-amber-300 font-medium leading-relaxed">
              "{scene.narration}"
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-2 pt-1">
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            setElapsed(Math.floor(pct * 120));
          }}>
            <div className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-400 transition-all duration-200" style={{ width: `${(elapsed / 120) * 100}%` }}></div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center shadow-lg transition-transform active:scale-95 text-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button onClick={() => jumpScene(Math.max(0, currentScene - 1))} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={() => jumpScene(Math.min(SCENES.length - 1, currentScene + 1))} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                <SkipForward className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsVoiceOn(!isVoiceOn);
                  if (isVoiceOn && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1.5"
              >
                {isVoiceOn ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                <span>Voice: {isVoiceOn ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-1 overflow-x-auto text-[11px] font-mono">
              {SCENES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpScene(i)}
                  className={`px-2 py-1 rounded transition-colors ${currentScene === i ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Scene {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
