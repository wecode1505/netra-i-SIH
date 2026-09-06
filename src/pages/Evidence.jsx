import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Video, Fingerprint, Box, Zap } from 'lucide-react';

const Evidence = () => {
  const evidenceData = [
    { id: 'EVD-017', label: 'Fingerprint #17', type: 'Fingerprint', location: 'Warehouse Door', status: 'Verification Pending', relevance: 'HIGH', icon: Fingerprint },
    { id: 'EVD-004', label: 'CCTV #04', type: 'Video', location: 'Warehouse — North Corridor', status: 'Analyzed', relevance: 'HIGH', icon: Video },
    { id: 'EVD-021', label: 'Vehicle V-21', type: 'Vehicle', location: 'Warehouse Loading Bay', status: 'Documented', relevance: 'MEDIUM', icon: Box },
    { id: 'EVD-009', label: 'Forced Entry Marks', type: 'Physical', location: 'Warehouse Door', status: 'Documented', relevance: 'MEDIUM', icon: Box },
    { id: 'EVD-030', label: 'Inventory Log Discrepancy', type: 'Document', location: 'Warehouse Office', status: 'Verification Pending', relevance: 'LOW', icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Evidence Vault</h1>
          <p className="text-gray-400 text-sm font-medium">Encrypted database of all logged material.</p>
        </div>
        <button className="group flex items-center gap-2 bg-gradient-to-r from-accent-cyan to-accent-indigo text-white px-5 py-2.5 rounded-lg font-mono text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5">
          <Upload size={16} className="group-hover:animate-bounce" />
          Secure Upload
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-xl border border-dark-700 rounded-2xl overflow-hidden shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-cyan"></div>
        
        <div className="grid grid-cols-6 gap-4 p-5 border-b border-dark-700 text-xs font-mono text-gray-400 uppercase tracking-widest bg-dark-900/50">
          <div className="col-span-1">Registry ID</div>
          <div className="col-span-2">Label</div>
          <div className="col-span-1">Classification</div>
          <div className="col-span-1">AI Status</div>
          <div className="col-span-1">Relevance</div>
        </div>

        <div className="divide-y divide-dark-700/50">
          {evidenceData.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item.id} 
              className="grid grid-cols-6 gap-4 p-5 items-center hover:bg-dark-700/30 transition-colors cursor-pointer group"
            >
              <div className="col-span-1 font-mono text-xs text-accent-cyan">{item.id}</div>
              <div className="col-span-2 flex items-center gap-3">
                <div className="p-2 bg-dark-900 rounded-lg group-hover:text-accent-cyan transition-colors border border-dark-700">
                  <item.icon size={16} />
                </div>
                <span className="font-bold text-white group-hover:text-accent-cyan transition-colors">{item.label}</span>
              </div>
              <div className="col-span-1 text-sm text-gray-400 font-medium">{item.type}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 border rounded-md text-[10px] font-mono flex items-center w-max gap-1 ${
                  item.status === 'Analyzed' ? 'border-emerald-900/50 text-emerald-400 bg-emerald-900/10' : 
                  item.status === 'Verification Pending' ? 'border-yellow-900/50 text-yellow-400 bg-yellow-900/10' : 
                  'border-dark-600 text-gray-300 bg-dark-900'
                }`}>
                  {item.status === 'Analyzed' && <Zap size={10} />}
                  {item.status}
                </span>
              </div>
              <div className={`col-span-1 font-mono text-xs font-bold ${
                item.relevance === 'HIGH' ? 'text-accent-red drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                item.relevance === 'MEDIUM' ? 'text-yellow-500' : 'text-gray-500'
              }`}>
                {item.relevance}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Evidence;