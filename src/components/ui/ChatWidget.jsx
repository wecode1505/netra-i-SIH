import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Shield, Loader2, Mic, AlertCircle } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(""); // NEW: Shows mic error on screen
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Tactical link established. Voice interrogation module online. Standing by for queries.' }
  ]);

  const playTacticalSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (err) {
      console.warn("Audio Context unavailable:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessageToAI = async (userMessage) => {
    setLoading(true);
    try {
      const response = await fetch('https://netra-i-sih.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      playTacticalSound();
      setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
    } catch (error) {
      console.error("Chat engine offline:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Critical Alert: Secure link to Netra-i AI Engine failed." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || loading) return;

    const rawQuery = inputText;
    const cleanQuery = rawQuery.trim().toLowerCase();
    
    setMessages(prev => [...prev, { sender: 'user', text: rawQuery }]);
    setInputText("");
    setMicError(""); // Clear any mic error on send

    // Hybrid Combo Engine (Offline Zero-Latency Check)
    const offlineCache = {
      "hi": "Greetings, Officer. Netra-i is online and monitoring all sectors.",
      "hello": "Greetings, Officer. Netra-i is online and monitoring all sectors.",
      "how are you": "All systems operating at 100% capacity. Ready for your command.",
      "how are you?": "All systems operating at 100% capacity. Ready for your command.",
      "status": "System status: GREEN. 3 Active cases loaded. No breaches detected.",
      "help": "You can ask me to summarize cases, track suspects, or analyze evidence.",
      "cases": "Currently tracking Case #2047, #3312, and #3390.",
    };

    if (offlineCache[cleanQuery]) {
      playTacticalSound();
      setMessages(prev => [...prev, { sender: 'ai', text: offlineCache[cleanQuery] }]);
      return;
    }

    sendMessageToAI(rawQuery);
  };

  // Robust Voice Recognition with UI Error Catching
  const startListening = () => {
    setMicError("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setMicError("Browser lacks speech support. Use Google Chrome.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setMicError("Mic blocked! Check browser address bar permissions.");
        } else {
          setMicError(`Mic Error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Init failed:", err);
      setIsListening(false);
      setMicError("Failed to initialize microphone.");
    }
  };

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)} 
      className="fixed bottom-6 right-6 p-4 bg-cyan-500 rounded-full text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 transition-all z-50 flex items-center justify-center"
    >
      <Bot size={24} />
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-[#0c121e]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col z-50 overflow-hidden font-mono">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-xs">
          <Shield size={16} className="text-cyan-400 animate-pulse" />
          NETRA-i TACTICAL INTEL
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 custom-scrollbar bg-slate-950/40">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-slate-500 mb-1">
              {msg.sender === 'user' ? 'OFFICER' : 'SYSTEM CORE'}
            </span>
            <div className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-200' 
                : 'bg-slate-900/90 text-slate-200 border border-slate-800 shadow-md'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
            <Loader2 size={14} className="animate-spin" />
            <span>Querying Classified Index...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Micro-Error Banner if something goes wrong */}
      {micError && (
        <div className="bg-rose-500/10 border-t border-rose-500/30 px-3 py-1.5 flex items-center gap-2 text-[10px] text-rose-400">
          <AlertCircle size={12} className="flex-shrink-0" />
          <span>{micError}</span>
        </div>
      )}

      {/* Input Field with Mic */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-800">
        <form onSubmit={handleSend} className="flex items-center bg-slate-950 border border-slate-700/60 rounded-xl pl-2 pr-1 focus-within:border-cyan-500 transition-colors">
          
          <button 
            type="button" 
            onClick={startListening}
            className={`p-2 rounded-lg transition-colors ${isListening ? 'text-rose-500 animate-pulse bg-rose-500/10' : 'text-slate-400 hover:text-cyan-400'}`}
            title="Voice Interrogation"
          >
            <Mic size={16} />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening... Speak now" : "Enter command or speak..."}
            className="flex-1 bg-transparent border-none text-xs text-slate-200 p-2 focus:outline-none placeholder-slate-500"
          />
          
          <button 
            type="submit" 
            disabled={loading || (!inputText.trim() && !isListening)}
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 disabled:opacity-30"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;