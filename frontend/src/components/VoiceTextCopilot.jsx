import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Bot, User, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const SUGGESTED_PROMPTS = {
  hi: [
    "गेहूं की फसल में यूरिया की सही मात्रा कितनी है?",
    "आज खेत में पानी देना चाहिए या नहीं?",
    "पत्तियों पर पीले धब्बे आ रहे हैं, क्या करें?",
    "पीएम-किसान सम्मान निधि योजना की जांच कैसे करें?"
  ],
  en: [
    "What is the recommended fertilizer dosage for wheat?",
    "Should I irrigate my field today based on moisture?",
    "My leaves have yellow streak spots, how to treat?",
    "How to register for AgriStack digital farmer ID?"
  ]
};

export default function VoiceTextCopilot({ selectedLang, selectedCrop }) {
  const [messages, setMessages] = useState([
    {
      sender: 'copilot',
      text: selectedLang === 'hi' 
        ? `नमस्ते! मैं आपका स्मार्ट एग्री-कोपायलट (डिजिटल कृषि सलाहकार) हूँ। आपकी फसल (${selectedCrop}) के लिए मौसम, सिंचाई, खाद या बीमारी का प्रश्न पूछें।`
        : `Hello! I am your Smart AgriCopilot (Digital Agronomist). Ask me anything about weather, irrigation, fertilizer, or crop diseases for your ${selectedCrop}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition (Voice Input)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser. Please type your query.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.start();
  };

  // Speech Synthesis (Text-to-Speech Output)
  const speakText = (text, index) => {
    if (!('speechSynthesis' in window)) return;
    
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, language: selectedLang, crop_context: selectedCrop })
      });
      const data = await res.json();
      
      const botMsg = {
        sender: 'copilot',
        text: data.response_text || "Unable to retrieve recommendation. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      // Fallback response if offline
      const fallbackText = selectedLang === 'hi' 
        ? `[ऑफ़लाइन मोड] फसल ${selectedCrop} के लिए: मौसम अनुकूल है। फसल में कीड़ों से बचाव हेतु शाम को नीम तेल (5ml/L) का छिड़काव करें।`
        : `[Offline Mode] For ${selectedCrop}: Soil conditions are stable. Spray Neem oil solution (5ml/L) in the evening to prevent pest infestation.`;
      
      setMessages(prev => [...prev, {
        sender: 'copilot',
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const prompts = SUGGESTED_PROMPTS[selectedLang] || SUGGESTED_PROMPTS['en'];

  return (
    <div className="glass-panel rounded-2xl border border-emerald-800/40 p-5 flex flex-col h-[520px] shadow-2xl relative overflow-hidden">
      
      {/* Copilot Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Multilingual Voice/Text AI Copilot
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h2>
            <p className="text-[11px] text-emerald-400/80">
              Low-literacy voice assistant for smallholder farmers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini 2.5 Flash</span>
        </div>
      </div>

      {/* Suggested Quick Question Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(p)}
            className="text-[11px] whitespace-nowrap bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/50 rounded-full px-3 py-1 transition-all flex items-center gap-1 shrink-0"
          >
            <span>✨</span> {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 my-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-amber-950/60 border border-amber-800/40 text-amber-100 rounded-tr-none'
                : 'bg-slate-900/90 border border-emerald-800/50 text-slate-200 rounded-tl-none shadow-md'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>
              
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-1">
                <span>{msg.time}</span>
                {msg.sender === 'copilot' && (
                  <button
                    onClick={() => speakText(msg.text, idx)}
                    className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    title="Listen Voice Output"
                  >
                    {speakingIndex === idx ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span className="text-amber-400 font-semibold">Playing...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Listen Voice</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 animate-pulse bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/30 max-w-xs">
            <Bot className="w-4 h-4" />
            <span>Analyzing Agronomic Data & Telemetry...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar with Voice Record button */}
      <div className="pt-2 border-t border-emerald-900/60">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2">
          
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce shadow-lg shadow-rose-900/50'
                : 'bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-300'
            }`}
            title="Click to speak (Voice Input)"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening 
                ? "Listening to voice input..." 
                : (selectedLang === 'hi' ? 'अपनी भाषा में सवाल पूछें या बोलें...' : 'Ask your farming query in your language...')
            }
            className="flex-1 bg-slate-950/80 border border-emerald-800/60 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-slate-950 font-bold flex items-center justify-center disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>

        </form>
      </div>

    </div>
  );
}
