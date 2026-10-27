import React from 'react';
import { Radio, AlertCircle, ShieldAlert, TrendingUp } from 'lucide-react';
import { LIVE_SCAM_FEED } from '../services/scamEngine';

export default function ScamFeedTicker({ language }) {
  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/60 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            {language === 'hi' ? 'लाइव साइबर थ्रेट रडार (भारत):' : 'Live National Scam Threat Radar (India):'}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Updated Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LIVE_SCAM_FEED.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-[#070b14] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{item.city}</span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  item.threat === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {item.threat}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-indigo-300">{item.type}</p>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {language === 'hi' ? item.desc_hi : item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-rose-400">
                <TrendingUp className="w-3 h-3" /> {item.reports} reports
              </span>
              <span>1930 alert</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
