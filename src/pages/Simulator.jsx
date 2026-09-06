import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const Simulator = () => {
  const [activeTab, setActiveTab] = useState('BEGINNER');

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
      description: 'Two suspects provide alibis that place them at the same location, but toll booth records show only one vehicle passed through. Analyze the CDR (Call Detail Records) to find the discrepancy.',
    },
    {
      id: 3,
      difficulty: 'EXPERT',
      title: 'The Phantom Shell Company',
      description: 'Trace a series of micro-transactions spanning three offshore accounts back to a local syndicate. You have access to partial bank ledgers and a redacted surveillance report.',
    }
  ];

  // Filter scenarios based on the selected tab
  const filteredScenarios = scenarios.filter(s => s.difficulty === activeTab);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <GraduationCap size={32} className="text-accent-red" />
          Detective Training
        </h1>
        <p className="text-gray-400 text-sm">
          A training feature, not a real criminal verdict system. Practice reasoning through scenarios of increasing complexity.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex gap-4 mb-8 border-b border-dark-700 pb-4">
        {['BEGINNER', 'INTERMEDIATE', 'EXPERT'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-mono text-xs tracking-widest border rounded transition-colors ${
              activeTab === tab 
                ? 'border-accent-red text-accent-red bg-red-900/10' 
                : 'border-dark-700 text-gray-500 hover:text-white hover:border-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scenario Cards */}
      <div className="space-y-6">
        {filteredScenarios.length > 0 ? (
          filteredScenarios.map((scenario) => (
            <div key={scenario.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-dark-600 transition-colors">
              <h2 className="text-xl font-bold text-white mb-3">{scenario.title}</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {scenario.description}
              </p>
              <button className="bg-accent-red hover:bg-red-700 text-white px-6 py-2 rounded font-mono text-sm transition-colors shadow-lg">
                Begin Scenario
              </button>
            </div>
          ))
        ) : (
          <div className="text-center p-10 bg-dark-800 border border-dark-700 rounded-xl">
            <p className="text-gray-500 font-mono text-sm">More scenarios coming soon in the next system update.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;