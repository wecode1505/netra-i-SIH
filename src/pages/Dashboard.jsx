import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, ShieldAlert, Fingerprint, ArrowUpRight } from 'lucide-react';
import MapWidget from '../components/ui/MapWidget'; // Import the Map!

const Dashboard = () => {
  const metrics = [
    { label: 'Active Cases', value: '4', icon: Activity, color: 'text-accent-cyan', bg: 'bg-cyan-500/10' },
    { label: 'Evidence Processed', value: '47', icon: Fingerprint, color: 'text-accent-indigo', bg: 'bg-indigo-500/10' },
    { label: 'Network Matches', value: '3', icon: BrainCircuit, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Critical Gaps', value: '5', icon: ShieldAlert, color: 'text-accent-red', bg: 'bg-red-500/10' },
  ];

  const aiInsights = [
    { time: '10:42 AM', text: 'Facial recognition match found in Case #2047 CCTV footage.' },
    { time: '09:15 AM', text: 'Financial anomaly detected linking Suspect A to offshore account.' },
    { time: '08:30 AM', text: 'Cross-referenced 3 historical cases matching current MO.' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-gray-400 font-mono text-sm mb-2 uppercase tracking-widest text-accent-cyan flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
            Live System Feed
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Intelligence Overview</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Animated Metrics Grid */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div 
            key={index} 
            variants={item}
            className="group relative bg-dark-800/50 backdrop-blur-md border border-dark-700 p-6 rounded-2xl hover:-translate-y-1 hover:border-dark-600 transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-${metric.color.split('-')[1]}-500/5`}></div>
            
            <div className="relative z-10 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${metric.bg}`}>
                  <metric.icon size={24} className={metric.color} />
                </div>
                <ArrowUpRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight">{metric.value}</h2>
                <p className="text-sm text-gray-400 font-medium mt-1">{metric.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Split Bottom Section: Active Cases Map & AI Insights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10"
      >
        {/* Active Investigations Map */}
        <div className="lg:col-span-2 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-2xl p-6 flex flex-col h-[500px]">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">Live Geospatial Tracking</h3>
          <div className="flex-1 rounded-xl overflow-hidden shadow-inner border border-dark-700">
            <MapWidget />
          </div>
        </div>

        {/* AI Automated Insights Panel */}
        <div className="lg:col-span-1 bg-gradient-to-b from-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6 relative overflow-hidden flex flex-col h-[500px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-indigo/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit size={20} className="text-accent-indigo" />
            <h3 className="text-xs font-mono text-white uppercase tracking-widest">Automated AI Insights</h3>
          </div>

          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {aiInsights.map((insight, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== aiInsights.length - 1 && <div className="absolute left-[5px] top-6 bottom-[-20px] w-[1px] bg-dark-700"></div>}
                
                <div className="mt-1 w-3 h-3 rounded-full bg-accent-indigo/20 border border-accent-indigo flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-mono text-accent-cyan mb-1">{insight.time}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-dark-900 hover:bg-dark-700 border border-dark-600 text-white py-2.5 rounded-lg text-xs font-mono transition-colors shadow-lg">
            Run Full Network Sweep
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;