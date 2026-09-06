import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Cases = () => {
  const caseData = [
    {
      id: "2047",
      status: "ACTIVE",
      title: "Downtown Warehouse Incident",
      type: "Robbery",
      location: "Downtown Warehouse",
      date: "12 August 2026",
      evidence: 5,
      gaps: 5
    },
    {
      id: "3312",
      status: "ACTIVE",
      title: "Sector 7 Vehicle Theft Ring",
      type: "Grand Theft Auto",
      location: "Sector 7 Parking Complex",
      date: "29 July 2026",
      evidence: 11,
      gaps: 2
    },
    {
      id: "3390",
      status: "ACTIVE",
      title: "Highland Ave. Burglary",
      type: "Burglary",
      location: "Highland Avenue, Sector 5",
      date: "18 August 2026",
      evidence: 8,
      gaps: 3
    },
    {
      id: "3401",
      status: "UNDER REVIEW",
      title: "Market Street Assault",
      type: "Assault",
      location: "Market Street",
      date: "22 August 2026",
      evidence: 6,
      gaps: 1
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Cases</h1>
        <p className="text-gray-400 text-sm">All investigations currently assigned to your unit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseData.map((c) => (
          <div key={c.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-dark-600 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-accent-red font-mono text-xs font-bold">CASE #{c.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  c.status === 'ACTIVE' ? 'bg-green-900/30 text-green-500 border border-green-800' : 'bg-yellow-900/30 text-yellow-500 border border-yellow-800'
                }`}>
                  {c.status}
                </span>
              </div>
              <ArrowUpRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">{c.title}</h2>
            <p className="text-gray-400 text-sm mb-6">{c.type} • {c.location}</p>
            
            <div className="flex items-center gap-6 text-xs text-gray-500 font-mono">
              <span>{c.evidence} evidence items</span>
              <span>{c.gaps} open gaps</span>
              <span>{c.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;