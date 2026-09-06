import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, CheckCircle2, Shield } from 'lucide-react';

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedIds, setConnectedIds] = useState([]);

  const detectives = [
    { id: 'DET-002', name: 'A. Sharma', unit: 'Robbery Unit — Sector 4', status: 'Available' },
    { id: 'DET-003', name: 'R. Kumar', unit: 'Cold Case Division', status: 'Offline' },
    { id: 'DET-008', name: 'M. Patel', unit: 'Cyber Forensics', status: 'In a Meeting' },
  ];

  const handleConnect = (id) => {
    if (!connectedIds.includes(id)) {
      setConnectedIds([...connectedIds, id]);
    }
  };

  const filteredDetectives = detectives.filter(d => 
    d.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Detective Network</h1>
        <p className="text-gray-400 text-sm font-medium">Secure inter-agency collaboration channels. Secure handshake required.</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-accent-cyan" />
        </div>
        <input
          type="text"
          placeholder="Search Detective ID or Unit (e.g. DET-002)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark-800/80 backdrop-blur border border-dark-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors font-mono shadow-inner"
        />
      </div>

      <div className="space-y-4">
        {filteredDetectives.map((det, index) => {
          const isConnected = connectedIds.includes(det.id);
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={det.id} 
              className="bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-2xl p-5 flex items-center justify-between hover:border-dark-600 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-center text-accent-cyan font-bold text-sm font-mono shadow-inner">
                  {String(index + 2).padStart(2, '0')}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-white font-bold font-mono tracking-wider text-lg">{det.id}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                      det.status === 'Available' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-800/50' :
                      det.status === 'Offline' ? 'bg-dark-900 text-gray-500 border-dark-700' :
                      'bg-yellow-900/20 text-yellow-500 border-yellow-800/50'
                    }`}>
                      {det.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1 font-medium">{det.unit}</p>
                </div>
              </div>

              <div>
                {isConnected ? (
                  <span className="flex items-center gap-2 text-accent-cyan text-xs font-mono bg-cyan-950/30 border border-cyan-800/50 px-4 py-2 rounded-lg">
                    <CheckCircle2 size={16} /> SECURE CHANNEL OPEN
                  </span>
                ) : (
                  <button 
                    onClick={() => handleConnect(det.id)}
                    className="group flex items-center gap-2 bg-dark-900 hover:bg-accent-cyan hover:text-dark-900 text-white border border-dark-600 hover:border-accent-cyan px-5 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 shadow-md"
                  >
                    <UserPlus size={14} className="group-hover:animate-pulse" />
                    REQUEST TO CONNECT
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Network;