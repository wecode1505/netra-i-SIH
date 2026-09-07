import React, { useState } from 'react';
import { Send, X, Bot } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputText, setInputText] = useState("");
  
  // This state holds all the chat bubbles
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'System online. I can analyze case files, find connections in the investigation graph, or summarize evidence. How can I assist you, Detective?' }
  ]);

  // The function to talk to your live Python backend
  const sendMessageToAI = async (userMessage) => {
    try {
      // UPDATED: Now pointing to your live Render backend!
      const response = await fetch('https://netra-i-sih.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      
      // Add the AI's response to the chat screen
      setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
      
    } catch (error) {
      console.error("Chat engine offline:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Error: Could not connect to the live AI Engine. Please check your connection." }]);
    }
  };

  // The function triggered when you click the "Send" button
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add the user's message to the screen immediately
    setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
    
    // Send it to the live Python AI backend
    sendMessageToAI(inputText);
    
    // Clear the input box
    setInputText("");
  };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 p-4 bg-accent-cyan rounded-full text-dark-900 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-50">
      <Bot size={24} />
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-dark-900 border border-dark-700 rounded-xl shadow-2xl flex flex-col z-50">
      {/* Chat Header */}
      <div className="flex justify-between items-center p-4 border-b border-dark-700 bg-dark-800/50 rounded-t-xl">
        <div className="flex items-center gap-2 text-white font-mono text-sm font-bold tracking-widest">
          <Bot size={16} className="text-accent-cyan" />
          AI ASSISTANT
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-3 rounded-lg max-w-[85%] text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-transparent text-white text-right' 
                : 'bg-dark-800 text-gray-300 border border-dark-700'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box Area */}
      <div className="p-4 bg-dark-800/50 rounded-b-xl border-t border-dark-700">
        <form onSubmit={handleSend} className="flex items-center bg-dark-950 border border-dark-700 rounded-lg pr-2 focus-within:border-accent-cyan transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about this case..."
            className="flex-1 bg-transparent border-none text-sm text-white p-3 focus:outline-none"
          />
          <button type="submit" className="text-gray-500 hover:text-accent-cyan transition-colors p-1">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;