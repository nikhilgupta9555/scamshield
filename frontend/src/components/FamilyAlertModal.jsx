import React, { useState } from 'react';
import { ShieldAlert, X, Send, HeartHandshake, CheckCircle2, Phone, User, Users } from 'lucide-react';
import { buildFamilyWhatsAppLink } from '../services/scamEngine';

export default function FamilyAlertModal({ isOpen, onClose, scamData, language }) {
  if (!isOpen) return null;

  const [trustedName, setTrustedName] = useState('Rohan');
  const [trustedPhone, setTrustedPhone] = useState('9876543210');
  const [victimName, setVictimName] = useState('Dad');
  const [relation, setRelation] = useState('Son');
  const [isSent, setIsSent] = useState(false);

  const scamType = scamData?.red_flags?.[0]?.tag || 'Digital Arrest / High Risk Phishing';
  const riskScore = scamData?.risk_score || 98;
  const snippet = scamData?.detected_text || 'Urgent police arrest threat or fake bank KYC message';

  const whatsappUrl = buildFamilyWhatsAppLink(
    trustedPhone,
    trustedName,
    victimName,
    scamType,
    riskScore,
    snippet
  );

  const handleDispatch = () => {
    setIsSent(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0e1526] border border-emerald-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 glow-shield-green">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{language === 'hi' ? 'फैमिली प्रोटेक्शन मोड' : 'Family Protection Mode'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                FAMILY SHIELD
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'hi'
                ? 'बुजुर्गों और परिजनों को धोखाधड़ी से बचाने के लिए तुरंत अलर्ट भेजें'
                : 'Instantly notify trusted family members before any money is transferred'}
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              {language === 'hi' ? 'भरोसेमंद रिश्तेदार का नाम:' : 'Trusted Relative Name:'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={trustedName}
                onChange={(e) => setTrustedName(e.target.value)}
                className="w-full bg-[#080d19] border border-slate-700 rounded-lg px-3 py-2 pl-8 text-white focus:outline-none focus:border-emerald-500"
              />
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              {language === 'hi' ? 'रिश्ता (उदा. बेटा/बेटी):' : 'Relation (e.g. Son/Daughter):'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full bg-[#080d19] border border-slate-700 rounded-lg px-3 py-2 pl-8 text-white focus:outline-none focus:border-emerald-500"
              />
              <Users className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-300 mb-1">
              {language === 'hi' ? 'व्हाट्सएप फोन नंबर:' : 'Relative WhatsApp Number:'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={trustedPhone}
                onChange={(e) => setTrustedPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#080d19] border border-slate-700 rounded-lg px-3 py-2 pl-8 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

        </div>

        {/* WhatsApp message preview card */}
        <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 text-xs space-y-2 font-mono">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 font-sans font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {language === 'hi' ? 'व्हाट्सएप संदेश पूर्वावलोकन:' : 'WhatsApp Emergency Message Preview:'}
            </span>
            <span>24x7 SOS</span>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed font-sans">
            🚨 <span className="font-bold text-white">ScamShield Emergency Family Alert</span><br />
            Dear {trustedName}, your {relation} <span className="font-bold text-white">{victimName}</span> just encountered a <span className="text-rose-400 font-bold">{riskScore}% Critical Scam</span>!<br />
            ⚠️ <span className="text-amber-300">Type:</span> {scamType}<br />
            🛡️ <span className="font-bold text-emerald-400">Please call them immediately</span> to ensure they do not send money or share OTP.
          </p>
        </div>

        {/* Dispatch Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            {language === 'hi' ? 'रद्द करें' : 'Close'}
          </button>

          <button
            onClick={handleDispatch}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            {isSent ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{language === 'hi' ? 'व्हाट्सएप खोला गया' : 'WhatsApp Launched!'}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{language === 'hi' ? 'व्हाट्सएप पर तुरंत अलर्ट भेजें' : 'Send WhatsApp Family SOS'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
