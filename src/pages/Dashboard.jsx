import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, ShieldAlert, Fingerprint, ArrowUpRight, Loader2 } from 'lucide-react';
import MapWidget from '../components/ui/MapWidget';

const Dashboard = () => {
  const [insights, setInsights] = useState([
    { time: '10:42 AM', text: 'Facial recognition match found in Case #2047 CCTV footage.' },
    { time: '09:15 AM', text: 'Financial anomaly detected linking Suspect A to offshore account.' },
  ]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // NEW: State to hold the custom text the user types in
  const [reportText, setReportText] = useState("");

  const metrics = [
    { label: 'Active Cases', value: '4', icon: Activity, color: 'text-accent-cyan', bg: 'bg-cyan-500/10' },
    { label: 'Evidence Processed', value: '47', icon: Fingerprint, color: 'text-accent-indigo', bg: 'bg-indigo-500/10' },
    { label: 'Network Matches', value: '3', icon: BrainCircuit, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Critical Gaps', value: '5', icon: ShieldAlert, color: 'text-accent-red', bg: 'bg-red-500/10' },
  ];

  const runAISweep = async () => {
    if (!reportText.trim()) return; // Don't run if the box is empty
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // NEW: Send the actual typed text instead of the hardcoded string
        body: JSON.stringify({ text: reportText })
      });
      
      const data = await response.json();
      
      const extractedPersons = data.entities.suspects_and_persons.join(", ") || "Unknown";
      const extractedOrgs = data.entities.organizations_involved.join(", ") || "Unknown";
      const extractedLocs = data.entities.locations_identified.join(", ") || "Unknown";
      
      const newInsight = {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        text: `LIVE SWEEP: AI extracted Suspect(s): [${extractedPersons}], Location(s): [${extractedLocs}], Org(s): [${extractedOrgs}].`
      };

      setInsights(prev => [newInsight, ...prev]);
      setReportText(""); // Clear the box after running

    } catch (error) {
      console.error("Failed to connect to AI Engine:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div key={index} variants={item} className="group relative bg-dark-800/50 backdrop-blur-md border border-dark-700 p-6 rounded-2xl hover:-translate-y-1 hover:border-dark-600 transition-all duration-300 overflow-hidden">
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
      
      {/* Split Bottom Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        
        {/* Active Investigations Map */}
        <div className="lg:col-span-2 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-2xl p-6 flex flex-col h-[550px]">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">Live Geospatial Tracking</h3>
          <div className="flex-1 rounded-xl overflow-hidden shadow-inner border border-dark-700">
            <MapWidget />
          </div>
        </div>

        {/* AI Automated Insights Panel */}
        <div className="lg:col-span-1 bg-gradient-to-b from-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6 relative overflow-hidden flex flex-col h-[550px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-indigo/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit size={20} className="text-accent-indigo" />
            <h3 className="text-xs font-mono text-white uppercase tracking-widest">Automated AI Insights</h3>
          </div>

          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar mb-4">
            {insights.map((insight, i) => (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex gap-4 relative">
                {i !== insights.length - 1 && <div className="absolute left-[5px] top-6 bottom-[-20px] w-[1px] bg-dark-700"></div>}
                <div className="mt-1 w-3 h-3 rounded-full bg-accent-indigo/20 border border-accent-indigo flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-mono text-accent-cyan mb-1">{insight.time}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{insight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* NEW: Custom Input Box for Live Demo */}
          <div className="mt-auto pt-4 border-t border-dark-700">
            <textarea 
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Enter raw field report for AI extraction..."
              className="w-full bg-dark-950 border border-dark-600 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-accent-cyan resize-none mb-3"
              rows="3"
            />
            <button 
              onClick={runAISweep}
              disabled={isAnalyzing || !reportText.trim()}
              className="w-full bg-dark-900 hover:bg-dark-700 border border-dark-600 text-white py-2.5 rounded-lg text-xs font-mono transition-colors shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <><Loader2 size={16} className="animate-spin text-accent-cyan" /> Processing...</>
              ) : (
                "Extract Intel via AI"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;