import React from 'react';
import { Shield, ShieldAlert, PhoneCall, Globe2, Sparkles, Video } from 'lucide-react';

export default function Header({ language, setLanguage, onOpenPitchTour, onOpenFamilyModal, onOpenVideoModal }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0d1424] rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#090d16]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Scam<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Shield</span>
              </h1>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                BrainByte
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {language === 'hi' 
                ? 'संदेश, लिंक और कॉल में रियल-टाइम साइबर फ्रॉड डिटेक्टर' 
                : 'AI that detects scams in messages, links and calls, in real time'}
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Watch Demo Video Button */}
          <button
            onClick={onOpenVideoModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-rose-600/30 to-purple-600/30 text-rose-300 border border-rose-500/50 hover:from-rose-600 hover:to-purple-600 hover:text-white transition-all shadow-sm animate-pulse"
            title="Watch 2-Minute Prototype Demo Video"
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>{language === 'hi' ? 'डेमो वीडियो' : 'Watch Demo Video (2m)'}</span>
          </button>

          {/* Pitch & Walkthrough button */}
          <button
            onClick={onOpenPitchTour}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400 hover:text-white transition-all shadow-sm"
            title="Interactive Pitch Deck & Demo Walkthrough"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{language === 'hi' ? 'डेमो वॉकथ्रू' : 'Judge Demo Tour'}</span>
          </button>

          {/* Family Protection Mode Quick Button */}
          <button
            onClick={onOpenFamilyModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{language === 'hi' ? 'फैमिली प्रोटेक्शन' : 'Family Shield'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white transition-all"
            title="Switch Language / भाषा बदलें"
          >
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Emergency 1930 Helpline */}
          <a
            href="tel:1930"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all animate-pulse"
            title="Direct Emergency Cyber Crime Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1930</span>
          </a>
        </div>

      </div>
    </header>
  );
}
