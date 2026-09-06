import React from 'react';

const Dashboard = () => {
  const metrics = [
    { label: 'Active Cases', value: '4' },
    { label: 'Evidence Items', value: '47' },
    { label: 'Related Cases', value: '3' },
    { label: 'Investigation Gaps', value: '5' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <p className="text-gray-400 font-mono text-sm mb-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="text-3xl font-bold text-white">System Overview.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-dark-800 border border-dark-700 p-6 rounded-xl flex flex-col justify-between h-32">
            <h2 className="text-4xl font-bold text-white">{metric.value}</h2>
            <p className="text-sm text-gray-400 font-medium">{metric.label}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Active Investigations</h3>
        <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl h-64 flex items-center justify-center">
          <p className="text-gray-500 font-mono text-sm">Dashboard metrics loaded successfully.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;