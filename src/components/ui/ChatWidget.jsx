import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message from the AI
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'System online. I can analyze case files, find connections in the investigation graph, or summarize evidence. How can I assist you, Detective?' }
  ]);

  // Auto-scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // The Mock AI Engine (For Hackathon Demonstration)
  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('2047') || lowerInput.includes('downtown') || lowerInput.includes('robbery')) {
      return "Case #2047 involves a robbery at the Downtown Warehouse. I've analyzed the graph: Suspect A's fingerprint (#17) was found at the scene, which contradicts Witness Statement #1. I recommend bringing Suspect A in for questioning.";
    } 
    if (lowerInput.includes('3312') || lowerInput.includes('vehicle') || lowerInput.includes('sector 7')) {
      return "Case #3312 is an active Grand Theft Auto ring in Sector 7. There are 11 evidence items logged, but I have detected 2 investigation gaps regarding the vehicle export routes. Would you like me to flag similar historical cases?";
    }
    if (lowerInput.includes('summary') || lowerInput.includes('status') || lowerInput.includes('dashboard')) {
      return "You currently have 4 Active Cases, 47 logged Evidence Items, and 5 open Investigation Gaps across your assigned unit.";
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Greetings. Netra-i AI systems are fully operational. What investigation would you like to focus on today?";
    }
    
    // Default fallback response
    return "I am scanning the National Crime Records Bureau database for that parameter. However, without direct access to that specific query, I recommend checking the Investigation Graph for visual connections.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking delay for a realistic feel
    setTimeout(() => {
      const aiReply = generateAIResponse(inputText);
      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-accent-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-110 z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark-800 p-4 border-b border-dark-700 flex justify-between items-center">
              <div className="flex items-center gap-2 text-accent-blue">
                <Sparkles size={18} />
                <span className="font-mono font-bold text-sm tracking-widest text-white">AI ASSISTANT</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`text-sm p-3 rounded-lg max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'bg-accent-blue text-white self-end' 
                      : 'bg-dark-800 border border-dark-700 text-gray-300 self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="bg-dark-800 border border-dark-700 text-gray-400 self-start p-3 rounded-lg flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-accent-blue" />
                  <span className="text-xs font-mono">Analyzing data...</span>
                </div>
              )}
              
              {/* Invisible div to snap scroll to bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-dark-700 bg-dark-800">
              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about this case..." 
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-accent-blue transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-blue transition-colors disabled:opacity-50 disabled:hover:text-gray-400"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;