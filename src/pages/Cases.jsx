import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cases = () => {
  const navigate = useNavigate();

  const caseData = [
    { id: "2047", status: "ACTIVE", title: "Downtown Warehouse Incident", type: "Robbery", location: "Downtown Warehouse", date: "12 August 2026", evidence: 5, gaps: 5, color: "text-accent-cyan" },
    { id: "3312", status: "ACTIVE", title: "Sector 7 Vehicle Theft Ring", type: "Grand Theft Auto", location: "Sector 7 Parking Complex", date: "29 July 2026", evidence: 11, gaps: 2, color: "text-emerald-400" },
    { id: "3390", status: "ACTIVE", title: "Highland Ave. Burglary", type: "Burglary", location: "Highland Avenue, Sector 5", date: "18 August 2026", evidence: 8, gaps: 3, color: "text-accent-indigo" },
    { id: "3401", status: "UNDER REVIEW", title: "Market Street Assault", type: "Assault", location: "Market Street", date: "22 August 2026", evidence: 6, gaps: 1, color: "text-yellow-500" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">My Cases</h1>
        <p className="text-gray-400 text-sm font-medium">All intelligence investigations currently assigned to your unit.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {caseData.map((c) => (
          <motion.div 
            key={c.id} 
            variants={item}
            onClick={() => navigate('/graph')}
            className="group relative bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-2xl p-6 hover:-translate-y-1 hover:border-accent-cyan transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
          >
            {/* Glassy hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-cyan/5 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold tracking-widest ${c.color}`}>CASE #{c.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    c.status === 'ACTIVE' ? 'bg-cyan-900/20 text-accent-cyan border-cyan-800/50' : 'bg-yellow-900/20 text-yellow-500 border-yellow-800/50'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className="p-2 bg-dark-900 rounded-lg group-hover:bg-accent-cyan transition-colors">
                  <ArrowUpRight size={18} className="text-gray-500 group-hover:text-dark-900 transition-colors" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">{c.title}</h2>
              <p className="text-gray-400 text-sm mb-6">{c.type} • {c.location}</p>
              
              <div className="flex items-center gap-6 text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1"><Activity size={14} className="text-accent-indigo"/> {c.evidence} evidence</span>
                <span className="flex items-center gap-1"><Clock size={14} className="text-accent-red"/> {c.gaps} gaps</span>
                <span>{c.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Cases;