import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ShieldAlert, CheckCircle } from 'lucide-react';

const Simulator = () => {
  const [activeTab, setActiveTab] = useState('BEGINNER');
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarios = [
    {
      id: 1,
      difficulty: 'BEGINNER',
      title: 'The Disabled Camera',
      description: 'Person X entered Room A at 21:42. Person Y disabled CCTV at 21:47. Person Z claims they were outside. A fingerprint was found near the control panel.',
    },
    {
      id: 2,
      difficulty: 'INTERMEDIATE',
      title: 'The Contradictory Alibi',
      description: 'Two suspects provide alibis that place them at the same location, but toll booth records show only one vehicle passed through. Analyze the CDR to find the discrepancy.',
    },
    {
      id: 3,
      difficulty: 'EXPERT',
      title: 'The Phantom Shell Company',
      description: 'Trace a series of micro-transactions spanning three offshore accounts back to a local syndicate. You have access to partial bank ledgers and a redacted surveillance report.',
    }
  ];

  const filteredScenarios = scenarios.filter(s => s.difficulty === activeTab);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
          <GraduationCap size={36} className="text-accent-cyan" />
          Detective Training Simulator
        </h1>
        <p className="text-gray-400 text-sm font-medium">
          Practice analytical reasoning through simulated tactical scenarios of increasing complexity.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex gap-4 mb-8 border-b border-dark-700 pb-4">
        {['BEGINNER', 'INTERMEDIATE', 'EXPERT'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedScenario(null); }}
            className={`px-5 py-2.5 font-mono text-xs tracking-widest rounded-xl transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                : 'bg-dark-800/50 text-gray-400 border border-dark-700 hover:text-white hover:border-dark-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification banner if a scenario is started */}
      <AnimatePresence>
        {selectedScenario && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-cyan-950/40 border border-accent-cyan rounded-xl p-4 flex items-center justify-between text-accent-cyan"
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={20} />
              <span className="font-mono text-sm font-bold">Simulator Initialized: {selectedScenario}</span>
            </div>
            <button onClick={() => setSelectedScenario(null)} className="text-xs font-mono underline hover:text-white">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenario Cards */}
      <div className="space-y-6">
        {filteredScenarios.map((scenario, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={scenario.id} 
            className="group bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-2xl p-6 hover:border-accent-cyan transition-all duration-300 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">{scenario.title}</h2>
                <span className="font-mono text-[10px] text-accent-indigo bg-indigo-950/40 border border-indigo-800/50 px-2.5 py-1 rounded-md">
                  {scenario.difficulty} TIER
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {scenario.description}
              </p>
              <button 
                onClick={() => setSelectedScenario(scenario.title)}
                className="bg-gradient-to-r from-accent-cyan to-accent-indigo hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-mono text-xs transition-all shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Begin Simulation
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Simulator;