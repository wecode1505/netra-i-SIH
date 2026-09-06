import React from 'react';
import { Upload, FileText, Video, Fingerprint, Box } from 'lucide-react';

const Evidence = () => {
  const evidenceData = [
    { id: 'EVD-017', label: 'Fingerprint #17', type: 'Fingerprint', location: 'Warehouse Door', status: 'Verification Pending', relevance: 'HIGH', icon: Fingerprint },
    { id: 'EVD-004', label: 'CCTV #04', type: 'Video', location: 'Warehouse — North Corridor', status: 'Documented', relevance: 'HIGH', icon: Video },
    { id: 'EVD-021', label: 'Vehicle V-21', type: 'Vehicle', location: 'Warehouse Loading Bay', status: 'Documented', relevance: 'MEDIUM', icon: Box },
    { id: 'EVD-009', label: 'Forced Entry Marks', type: 'Physical', location: 'Warehouse Door', status: 'Documented', relevance: 'MEDIUM', icon: Box },
    { id: 'EVD-030', label: 'Inventory Log Discrepancy', type: 'Document', location: 'Warehouse Office', status: 'Verification Pending', relevance: 'LOW', icon: FileText },
  ];

  const getRelevanceColor = (relevance) => {
    if (relevance === 'HIGH') return 'text-accent-red';
    if (relevance === 'MEDIUM') return 'text-yellow-500';
    return 'text-gray-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Evidence</h1>
          <p className="text-gray-400 text-sm">All evidence items across your active investigations.</p>
        </div>
        <button className="flex items-center gap-2 bg-accent-blue hover:bg-blue-700 text-white px-4 py-2 rounded font-mono text-sm transition-colors shadow-lg">
          <Upload size={16} />
          Upload File
        </button>
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-dark-700 text-xs font-mono text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">ID</div>
          <div className="col-span-2">Label</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Relevance</div>
        </div>

        <div className="divide-y divide-dark-700">
          {evidenceData.map((item) => (
            <div key={item.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-dark-700/30 transition-colors">
              <div className="col-span-1 font-mono text-xs text-gray-400">{item.id}</div>
              <div className="col-span-2 flex items-center gap-3">
                <item.icon size={16} className="text-gray-500" />
                <span className="font-bold text-white">{item.label}</span>
              </div>
              <div className="col-span-1 text-sm text-gray-400">{item.type}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 border rounded text-[10px] font-mono ${
                  item.status === 'Verification Pending' ? 'border-yellow-900/50 text-yellow-600' : 'border-dark-600 text-gray-400'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className={`col-span-1 font-mono text-xs font-bold ${getRelevanceColor(item.relevance)}`}>
                {item.relevance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evidence;
