import React, { useState } from 'react';
import { UserPlus, Search, ShieldCheck } from 'lucide-react';

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const detectives = [
    { id: 'DET-002', name: 'A. Sharma', unit: 'Robbery Unit — Sector 4', status: 'Available' },
    { id: 'DET-003', name: 'R. Kumar', unit: 'Cold Case Division', status: 'Offline' },
    { id: 'DET-008', name: 'M. Patel', unit: 'Cyber Forensics', status: 'In a Meeting' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Detective Network</h1>
        <p className="text-gray-400 text-sm">
          Detectives cannot directly message someone before a connection request is accepted.
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search Detective ID (e.g. DET-002)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark-800 border border-dark-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent-blue transition-colors font-mono"
        />
      </div>

      <div className="space-y-4">
        {detectives.map((det, index) => (
          <div key={det.id} className="bg-dark-800 border border-dark-700 rounded-xl p-4 flex items-center justify-between hover:border-dark-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-dark-900 border border-dark-700 flex items-center justify-center text-accent-red font-bold text-xs font-mono">
                {String(index + 2).padStart(2, '0')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-white font-bold font-mono">{det.id}</h2>
                </div>
                <p className="text-gray-400 text-xs">{det.unit}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded text-[10px] font-mono border ${
                det.status === 'Available' ? 'bg-green-900/30 text-green-500 border-green-800' :
                det.status === 'Offline' ? 'bg-dark-900 text-gray-500 border-dark-700' :
                'bg-yellow-900/30 text-yellow-500 border-yellow-800'
              }`}>
                {det.status}
              </span>
              <button className="flex items-center gap-2 border border-dark-600 hover:border-accent-blue hover:text-accent-blue text-gray-300 px-4 py-2 rounded text-xs font-mono transition-colors">
                <UserPlus size={14} />
                REQUEST TO CONNECT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;