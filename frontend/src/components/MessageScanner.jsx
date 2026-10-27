import React from 'react';
import { MessageSquare, Send, Trash2, Clipboard } from 'lucide-react';

export default function MessageScanner({ text, setText, onScan, isScanning, language }) {
  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      setText(clipText);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hi' 
            ? 'एसएमएस, व्हाट्सएप, टेलीग्राम संदेश या ईमेल यहां पेस्ट करें:' 
            : 'Paste SMS, WhatsApp message, Telegram job offer or email content:'}
        </label>
        
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            language === 'hi'
              ? 'उदा. "Dear customer, your bank account is suspended. Update KYC at http://sbi-kyc.xyz or call immediately..."'
              : 'e.g. "Dear customer, your bank account is suspended. Update KYC at http://sbi-kyc.xyz within 24 hours to avoid penalty..."'
          }
          className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono transition-all resize-none shadow-inner"
        />

        <div className="absolute right-3 top-9 flex items-center space-x-1.5">
          <button
            type="button"
            onClick={handlePaste}
            className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 transition-colors border border-slate-700"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3 h-3" />
            <span className="hidden sm:inline">{language === 'hi' ? 'पेस्ट' : 'Paste'}</span>
          </button>
          {text && (
            <button
              type="button"
              onClick={() => setText('')}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 transition-colors border border-slate-700"
              title="Clear text"
            >
              <Trash2 className="w-3 h-3 text-rose-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-400"></span>
          <span>
            {language === 'hi' 
              ? 'हिंदी और अंग्रेजी दोनों भाषाएं समर्थित हैं' 
              : 'Supports English, Hinglish & Hindi scripts'}
          </span>
        </div>

        <button
          onClick={onScan}
          disabled={!text.trim() || isScanning}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
            !text.trim() || isScanning
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white shadow-indigo-500/25 active:scale-[0.98]'
          }`}
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{language === 'hi' ? 'विश्लेषण जारी है...' : 'Scanning Message...'}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'संदेश की जांच करें' : 'Analyze Message'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
