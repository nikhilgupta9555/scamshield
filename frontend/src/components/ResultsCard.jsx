import React from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, PhoneCall, ExternalLink, 
  CheckCircle2, XCircle, Share2, AlertOctagon, HeartHandshake, Info 
} from 'lucide-react';

export default function ResultsCard({ result, language, onTriggerFamilyAlert }) {
  if (!result) return null;

  const isScam = result.risk_score >= 70;
  const isSuspicious = result.risk_score >= 35 && result.risk_score < 70;
  const isSafe = result.risk_score < 35;

  const getBorderColor = () => {
    if (isScam) return 'border-rose-500/50 shadow-rose-950/40 glow-shield-red';
    if (isSuspicious) return 'border-amber-500/50 shadow-amber-950/40';
    return 'border-emerald-500/50 shadow-emerald-950/40 glow-shield-green';
  };

  const getBadgeBg = () => {
    if (isScam) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (isSuspicious) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  };

  return (
    <div className={`bg-[#0d1424] border rounded-2xl p-5 sm:p-7 shadow-2xl transition-all space-y-6 ${getBorderColor()}`}>
      
      {/* Top Header: Score & Verdict */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${getBadgeBg()}`}>
            {isScam ? (
              <ShieldAlert className="w-9 h-9 text-rose-400 animate-pulse" />
            ) : isSuspicious ? (
              <AlertTriangle className="w-9 h-9 text-amber-400" />
            ) : (
              <ShieldCheck className="w-9 h-9 text-emerald-400" />
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getBadgeBg()}`}>
                {isScam ? (language === 'hi' ? 'खतरनाक स्कैम' : 'CRITICAL SCAM') : isSuspicious ? (language === 'hi' ? 'संदिग्ध' : 'SUSPICIOUS') : (language === 'hi' ? 'सुरक्षित' : 'SAFE')}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {language === 'hi' ? 'एआई विश्लेषण पूरा हुआ' : 'AI Analysis Verified'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {language === 'hi' ? result.verdict_label_hi : result.verdict_label}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === 'hi' ? result.action_guide?.summary_hi : result.action_guide?.summary}
            </p>
          </div>
        </div>

        {/* Threat Score Circle */}
        <div className="flex items-center space-x-3 self-end md:self-auto bg-[#070b14] px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              {language === 'hi' ? 'जोखिम स्कोर' : 'Risk Score'}
            </span>
            <span className={`text-2xl font-black font-mono ${isScam ? 'text-rose-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'}`}>
              {result.risk_score}%
            </span>
          </div>

          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${isScam ? 'text-rose-500' : isSuspicious ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000`}
                strokeDasharray={`${result.risk_score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

      </div>

      {/* Digital Arrest Awareness Banner if triggered */}
      {result.is_digital_arrest && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/40 flex items-start space-x-3.5">
          <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-rose-300">
              {language === 'hi' ? 'सावधान: "डिजिटल अरेस्ट" का फर्जी दावा!' : 'WARNING: Fake "Digital Arrest" Extortion Tactic'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {language === 'hi' ? result.legal_fact_hi : result.legal_fact}
            </p>
          </div>
        </div>
      )}

      {/* Red Flags Breakdown */}
      {result.red_flags && result.red_flags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              {language === 'hi' ? 'पहचाने गए खतरे और लाल झंडे (Red Flags):' : 'Identified Scam Red Flags:'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.red_flags.map((flag, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#080d19] border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    {language === 'hi' ? flag.tag_hi : flag.tag}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                    {flag.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'hi' ? flag.explanation_hi : flag.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Guide: Dos and Don'ts */}
      {result.action_guide && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            {language === 'hi' ? 'तुरंत क्या करें और क्या न करें (Action Guide):' : 'Immediate Action Guide:'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Don'ts */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2.5">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                {language === 'hi' ? 'कदापि न करें (Never Do This):' : 'What NOT To Do:'}
              </span>
              <ul className="space-y-2">
                {(language === 'hi' ? result.action_guide.donts_hi : result.action_guide.donts)?.map((dont, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{dont}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dos */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2.5">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'hi' ? 'तुरंत करें (Recommended Steps):' : 'Recommended Next Steps:'}
              </span>
              <ul className="space-y-2">
                {(language === 'hi' ? result.action_guide.dos_hi : result.action_guide.dos)?.map((doItem, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{doItem}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Emergency Helpline & Family Alert CTA Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#080d19] border border-slate-800">
        
        {/* Call 1930 */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:1930"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'hi' ? '1930 पर तुरंत कॉल करें' : 'Call 1930 Helpline'}</span>
          </a>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 underline transition-colors"
          >
            <span>cybercrime.gov.in</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Family Shield SOS Alert */}
        {isScam && (
          <button
            onClick={() => onTriggerFamilyAlert(result)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{language === 'hi' ? 'परिवार को सतर्क करें (WhatsApp SOS)' : 'Alert Family Contact (WhatsApp)'}</span>
          </button>
        )}

      </div>

    </div>
  );
}

function ArrowUpRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
    </svg>
  );
}
