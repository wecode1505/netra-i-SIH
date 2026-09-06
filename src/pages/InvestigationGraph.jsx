import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

const initialNodes = [
  { id: '1', position: { x: 250, y: 100 }, data: { label: 'Suspect A' }, style: { background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' } },
  { id: '2', position: { x: 100, y: 250 }, data: { label: 'Witness Statement #1' }, style: { background: '#1e2128', color: '#06b6d4', border: '1px solid #06b6d4', borderRadius: '8px', padding: '12px', fontFamily: 'monospace' } },
  { id: '3', position: { x: 400, y: 250 }, data: { label: 'Fingerprint #17' }, style: { background: '#1e2128', color: '#6366f1', border: '1px solid #6366f1', borderRadius: '8px', padding: '12px', fontFamily: 'monospace' } },
  { id: '4', position: { x: 400, y: 400 }, data: { label: 'Downtown Warehouse' }, style: { background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'contradicts', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, label: 'supports', style: { stroke: '#06b6d4', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'found at', style: { stroke: '#10b981', strokeWidth: 2 } },
];

const InvestigationGraph = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[85vh] w-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Investigation Graph</h1>
          <p className="text-accent-cyan text-sm font-mono mt-2 tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></span>
            Case #2047: Downtown Warehouse
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-dark-800/50 backdrop-blur border border-dark-700 text-white px-5 py-2.5 rounded-lg font-mono text-xs hover:bg-dark-700 hover:border-accent-indigo transition-all">Add Node</button>
          <button className="bg-gradient-to-r from-accent-cyan to-accent-indigo text-white px-5 py-2.5 rounded-lg font-mono text-xs shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">Run AI Analysis</button>
        </div>
      </div>
      
      <div className="flex-1 bg-dark-900/80 backdrop-blur-md border border-dark-700 rounded-2xl overflow-hidden relative shadow-2xl">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
          <Background color="#1e2128" gap={20} size={2} />
          <Controls className="bg-dark-800 fill-white border-dark-700 text-white shadow-xl rounded-lg overflow-hidden" />
          <MiniMap 
            nodeStrokeColor={(n) => n.style?.background || '#1e2128'}
            nodeColor={(n) => n.style?.background || '#1e2128'}
            maskColor="rgba(5, 5, 5, 0.8)"
            className="bg-dark-800 border-dark-700 rounded-lg"
          />
        </ReactFlow>
      </div>
    </motion.div>
  );
};

export default InvestigationGraph;