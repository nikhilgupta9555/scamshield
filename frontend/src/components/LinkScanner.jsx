import React, { useState } from 'react';
import { Link2, ShieldCheck, AlertCircle, ArrowUpRight, Search } from 'lucide-react';

const SAMPLE_LINKS = [
  { url: 'https://sbi-kyc-update.xyz/login', desc: 'SBI Lookalike Phishing Link (.xyz)' },
  { url: 'https://bit.ly/claim-lottery-crorepati', desc: 'Masked URL Shortener for Lottery Scam' },
  { url: 'https://secure.onlinesbi.sbi', desc: 'Legitimate Official State Bank of India Domain' },
  { url: 'http://192.168.1.104/hdfc-pan-update', desc: 'Suspicious Raw IP Address Phishing Host' }
];

export default function LinkScanner({ onScan, isScanning, language }) {
  const [url, setUrl] = useState(SAMPLE_LINKS[0].url);

  const handleScan = () => {
    onScan({
      type: 'link',
      url: url.trim(),
      text: url.trim()
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Sample Links bar */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hi' ? 'परीक्षण के लिए लिंक चुनें:' : 'Test with Sample Links:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_LINKS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setUrl(item.url)}
              className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                url === item.url
                  ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-200'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <p className="font-mono truncate">{item.url}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hi' ? 'वेबसाइट लिंक या डोमेन दर्ज करें:' : 'Enter Website Link or Domain to Inspect:'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://sbi-kyc-update.xyz or bank-login.top"
            className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl px-4 py-3 pl-10 text-sm text-slate-100 placeholder:text-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-inner"
          />
          <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          {language === 'hi'
            ? 'डोमेन की उम्र, टाइपो-स्क्वैटिंग और बैंकिंग नकल की जांच करता है'
            : 'Scans for typosquatting, deceptive TLDs (.xyz, .top), and banking impersonation'}
        </p>

        <button
          onClick={handleScan}
          disabled={!url.trim() || isScanning}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{language === 'hi' ? 'लिंक की जांच जारी...' : 'Analyzing Link...'}</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>{language === 'hi' ? 'लिंक की सुरक्षा जांचें' : 'Check Link Safety'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
