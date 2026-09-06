import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Terminal } from 'lucide-react';

const Messages = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto h-[80vh] flex flex-col justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Secure Investigation Chat</h1>
        <p className="text-gray-400 text-sm">Military-grade end-to-end encrypted messaging channel.</p>
      </div>

      <div className="bg-dark-800/50 backdrop-blur-xl border border-dark-700 rounded-2xl flex flex-col items-center justify-center p-12 text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-dark-900 rounded-2xl border border-dark-700 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <Lock size={40} className="text-accent-cyan" />
            </div>
          </div>
          <h2 className="text-white font-bold text-xl mb-3 tracking-wide">ENCRYPTED CHANNEL LOCKED</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Direct communication is restricted under national security protocols. Messaging unlocks automatically once a collaboration request is accepted in the Detective Network.
          </p>
          <div className="inline-flex items-center gap-2 bg-dark-900 border border-dark-700 px-4 py-2 rounded-lg text-xs font-mono text-gray-400">
            <Terminal size={14} className="text-accent-indigo" />
            STATUS: WAITING FOR HANDSHAKE
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;