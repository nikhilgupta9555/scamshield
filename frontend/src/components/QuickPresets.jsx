import React from 'react';
import { SAMPLE_PRESETS } from '../services/scamEngine';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function QuickPresets({ language, onSelectPreset, activePresetId }) {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            {language === 'hi' ? '1-क्लिक टेस्ट प्रीसेट (जज व टेस्टर्स के लिए)' : '1-Click Test Presets (For Judges & Evaluators)'}
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          {language === 'hi' ? 'तुरंत विश्लेषण देखने के लिए किसी एक पर क्लिक करें' : 'Click any scenario to load & scan instantly'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {SAMPLE_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700/70 text-slate-300">
                  {preset.badge}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isActive ? 'translate-x-0.5 text-indigo-400' : 'group-hover:translate-x-0.5'}`} />
              </div>
              <p className="text-xs font-semibold text-white line-clamp-1">
                {language === 'hi' ? preset.label_hi : preset.label}
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                {preset.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
