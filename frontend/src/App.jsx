import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuickPresets from './components/QuickPresets';
import MessageScanner from './components/MessageScanner';
import ScreenshotScanner from './components/ScreenshotScanner';
import CallScanner from './components/CallScanner';
import LinkScanner from './components/LinkScanner';
import ResultsCard from './components/ResultsCard';
import FamilyAlertModal from './components/FamilyAlertModal';
import ScamFeedTicker from './components/ScamFeedTicker';
import PitchWalkthroughModal from './components/PitchWalkthroughModal';
import DemoVideoModal from './components/DemoVideoModal';
import Footer from './components/Footer';

import { analyzeScam, SAMPLE_PRESETS } from './services/scamEngine';
import { MessageSquare, Camera, PhoneCall, Link2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'screenshot' | 'call' | 'link'
  const [textInput, setTextInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activePresetId, setActivePresetId] = useState(null);

  // Modals
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isPitchTourOpen, setIsPitchTourOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Load first sample on initial render for an impressive immediate display
  useEffect(() => {
    handleSelectPreset(SAMPLE_PRESETS[0]);
  }, []);

  const handleSelectPreset = async (preset) => {
    setActivePresetId(preset.id);
    if (preset.category === 'call') {
      setActiveTab('call');
    } else {
      setActiveTab('message');
      setTextInput(preset.text);
    }

    setIsScanning(true);
    try {
      const result = await analyzeScam({
        type: preset.category,
        text: preset.text,
        language
      });
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleScanText = async () => {
    if (!textInput.trim()) return;
    setIsScanning(true);
    setActivePresetId(null);
    try {
      const result = await analyzeScam({
        type: 'message',
        text: textInput,
        language
      });
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleCustomScan = async (payload) => {
    setIsScanning(true);
    setActivePresetId(null);
    try {
      const result = await analyzeScam({
        ...payload,
        language
      });
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navigation Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        onOpenPitchTour={() => setIsPitchTourOpen(true)}
        onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{language === 'hi' ? 'साइबर फ्रॉड से तुरंत सुरक्षा' : 'Multi-Input Real-Time Cyber Shield'}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {language === 'hi' ? (
              <>धोखाधड़ी संदेश, लिंक और कॉल को <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">तुरंत पहचानें</span></>
            ) : (
              <>Detect Scams in Messages, Links & Calls <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">in Real Time</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            {language === 'hi' 
              ? 'संदेश पेस्ट करें, स्क्रीनशॉट अपलोड करें या कॉल रिकॉर्डिंग जांचें। एआई तुरंत लाल झंडे और बचने के उपाय बताएगा।'
              : 'Paste a message, upload a screenshot, or check a call transcript. AI gives a clear verdict, explains the red flags in simple Hindi or English, and alerts your family.'}
          </p>
        </div>

        {/* 1-Click Test Presets */}
        <QuickPresets
          language={language}
          onSelectPreset={handleSelectPreset}
          activePresetId={activePresetId}
        />

        {/* Main Scanner Section */}
        <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
          
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab('message')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'message'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'hi' ? 'संदेश स्कैनर' : 'Message / SMS'}</span>
            </button>

            <button
              onClick={() => setActiveTab('screenshot')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{language === 'hi' ? 'स्क्रीनशॉट (OCR)' : 'Screenshot (OCR)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('call')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'call'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'hi' ? 'कॉल व डिजिटल अरेस्ट' : 'Call & Digital Arrest'}</span>
            </button>

            <button
              onClick={() => setActiveTab('link')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'link'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>{language === 'hi' ? 'लिंक / डोमेन चेकर' : 'Link & Domain'}</span>
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="pt-1">
            {activeTab === 'message' && (
              <MessageScanner
                text={textInput}
                setText={setTextInput}
                onScan={handleScanText}
                isScanning={isScanning}
                language={language}
              />
            )}

            {activeTab === 'screenshot' && (
              <ScreenshotScanner
                onScan={handleCustomScan}
                isScanning={isScanning}
                language={language}
              />
            )}

            {activeTab === 'call' && (
              <CallScanner
                onScan={handleCustomScan}
                isScanning={isScanning}
                language={language}
              />
            )}

            {activeTab === 'link' && (
              <LinkScanner
                onScan={handleCustomScan}
                isScanning={isScanning}
                language={language}
              />
            )}
          </div>

        </div>

        {/* Analysis Results Display */}
        {analysisResult && (
          <ResultsCard
            result={analysisResult}
            language={language}
            onTriggerFamilyAlert={() => setIsFamilyModalOpen(true)}
          />
        )}

        {/* Live Scam Threat Feed */}
        <ScamFeedTicker language={language} />

      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Modals */}
      <FamilyAlertModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        scamData={analysisResult}
        language={language}
      />

      <PitchWalkthroughModal
        isOpen={isPitchTourOpen}
        onClose={() => setIsPitchTourOpen(false)}
        language={language}
      />

      <DemoVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

    </div>
  );
}
