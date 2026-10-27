import React from 'react';
import { Shield, Github, ExternalLink, Video, PhoneCall, Heart } from 'lucide-react';

export default function Footer({ language }) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070b14] py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Info */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                BrainByte <span className="text-emerald-400">ScamShield</span>
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' 
                  ? 'रियल-टाइम एआई आधारित स्कैम, फिशिंग और डिजिटल अरेस्ट डिटेक्टर'
                  : 'AI that detects scams in messages, links and calls, in real time'}
              </p>
            </div>
          </div>

          {/* Submission Links Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/brainbyte/scamshield"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>

            <a
              href="https://brainbyte-scamshield.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Working Prototype</span>
            </a>

            <a
              href="https://youtu.be/BrainByte-ScamShield-Demo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-rose-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Demo Video</span>
            </a>
          </div>

        </div>

        {/* Disclaimer & Helpline Info */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>
            Indian Cyber Crime Coordination Centre (I4C) Compliant • Always dial <a href="tel:1930" className="text-rose-400 font-bold hover:underline">1930</a> for cyber fraud emergencies.
          </p>
          <p className="flex items-center gap-1">
            Built by <span className="font-semibold text-white">Team BrainByte</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
