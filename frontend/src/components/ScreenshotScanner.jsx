import React, { useState } from 'react';
import { Camera, UploadCloud, FileImage, CheckCircle, AlertTriangle } from 'lucide-react';

const SAMPLE_SCREENSHOTS = [
  {
    id: 'sbi_sms_screenshot',
    title: 'Fake SBI YONO KYC Notice',
    title_hi: 'फर्जी एसबीआई केवाईसी नोटिस',
    type: 'Bank SMS Phishing',
    extractedText: 'SBI ALERT: Dear customer, your NetBanking access is disabled today. Verify your PAN card immediately at https://sbi-kyc-update.xyz to restore account access.',
    visualFlags: ['Suspicious domain extension (.xyz)', 'Counterfeit banking urgent notice']
  },
  {
    id: 'fake_upi_payment',
    title: 'Forged PhonePe UPI Slip',
    title_hi: 'फर्जी फोनपे पेमेंट रसीद',
    type: 'UPI Refund Scam',
    extractedText: 'Paid Successfully: ₹25,000 sent to merchant. UTR: 489102819201. Accidental payment - please refund ₹10,000 to sender immediately.',
    visualFlags: ['Altered font sizing in payment confirmation', 'Classic overpayment refund pretext']
  },
  {
    id: 'fake_police_notice',
    title: 'Fake CBI Digital Arrest Warrant',
    title_hi: 'फर्जी सीबीआई गिरफ्तारी वारंट',
    type: 'Digital Arrest Warrant',
    extractedText: 'CENTRAL BUREAU OF INVESTIGATION (CBI) CYBER CELL: ORDER OF DIGITAL ARREST. Accused linked with 140g narcotics courier. Stay on video call and pay ₹1,50,000 clearance fund.',
    visualFlags: ['Forged government logo/stamp', 'Illegal digital arrest demand']
  }
];

export default function ScreenshotScanner({ onScan, isScanning, language }) {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_SCREENSHOTS[0]);
  const [customText, setCustomText] = useState(SAMPLE_SCREENSHOTS[0].extractedText);
  const [fileName, setFileName] = useState(null);

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setCustomText(sample.extractedText);
    setFileName(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Simulate OCR extraction for custom file
      setCustomText(`[OCR Extracted from ${file.name}]: URGENT NOTICE - Your account KYC has expired. Update now at http://secure-update-portal.top or your account will be suspended.`);
    }
  };

  const handleExecuteScan = () => {
    onScan({
      type: 'screenshot',
      text: customText,
      imageText: customText
    });
  };

  return (
    <div className="space-y-5">
      
      {/* Sample presets picker */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {language === 'hi' ? 'नमूना स्क्रीनशॉट चुनें (परीक्षण हेतु):' : 'Select a Test Screenshot Scenario:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_SCREENSHOTS.map((s) => {
            const isCurrent = selectedSample?.id === s.id && !fileName;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSample(s)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <FileImage className={`w-3.5 h-3.5 ${isCurrent ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-semibold text-white">
                    {language === 'hi' ? s.title_hi : s.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{s.type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl p-6 bg-[#0d1424]/60 text-center transition-colors">
        <input
          type="file"
          id="screenshot-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label htmlFor="screenshot-upload" className="cursor-pointer flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-slate-200">
            {fileName ? (
              <span className="text-emerald-400 flex items-center gap-1.5 justify-center">
                <CheckCircle className="w-4 h-4" /> {fileName}
              </span>
            ) : (
              language === 'hi' 
                ? 'स्क्रीनशॉट अपलोड करने के लिए क्लिक या ड्रैग करें' 
                : 'Upload your own screenshot (SMS, WhatsApp, Payment Slip)'
            )}
          </span>
          <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
        </label>
      </div>

      {/* OCR text extraction preview */}
      <div className="bg-[#0b101d] rounded-xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {language === 'hi' ? 'ओसीआर (OCR) द्वारा पहचाना गया टेक्स्ट:' : 'OCR Text Recognition Output:'}
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            BrainByte Vision OCR
          </span>
        </div>

        <textarea
          rows={3}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full bg-[#070a12] border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 resize-none"
        />

        {selectedSample?.visualFlags && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {selectedSample.visualFlags.map((flag, idx) => (
              <span key={idx} className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" /> {flag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          onClick={handleExecuteScan}
          disabled={!customText.trim() || isScanning}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{language === 'hi' ? 'स्क्रीनशॉट स्कैन हो रहा है...' : 'Scanning Screenshot...'}</span>
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              <span>{language === 'hi' ? 'स्क्रीनशॉट का विश्लेषण करें' : 'Analyze Screenshot OCR'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
