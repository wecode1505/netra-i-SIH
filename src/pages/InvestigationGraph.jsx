import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 100 }, data: { label: 'Suspect A' }, style: { background: '#dc2626', color: 'white', border: '1px solid #7f1d1d', borderRadius: '4px', padding: '10px' } },
  { id: '2', position: { x: 100, y: 250 }, data: { label: 'Witness Statement #1' }, style: { background: '#d97706', color: 'white', border: '1px solid #92400e', borderRadius: '4px', padding: '10px' } },
  { id: '3', position: { x: 400, y: 250 }, data: { label: 'Fingerprint #17' }, style: { background: '#1e1e1e', color: 'white', border: '1px solid #333', borderRadius: '4px', padding: '10px' } },
  { id: '4', position: { x: 400, y: 400 }, data: { label: 'Downtown Warehouse' }, style: { background: '#059669', color: 'white', border: '1px solid #065f46', borderRadius: '4px', padding: '10px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'contradicts', style: { stroke: '#ef4444' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, label: 'supports', style: { stroke: '#3b82f6' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'found at', style: { stroke: '#10b981' } },
];

const InvestigationGraph = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Investigation Graph</h1>
          <p className="text-gray-400 text-sm font-mono mt-1">CASE #2047: DOWNTOWN WAREHOUSE INCIDENT</p>
        </div>
      </div>
      
      <div className="flex-1 bg-dark-900 border border-dark-700 rounded-xl overflow-hidden relative shadow-2xl h-[600px]">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#333" gap={20} size={1} />
          <Controls className="bg-dark-800 fill-white border-dark-700 text-white" />
          <MiniMap 
            nodeStrokeColor={(n) => n.style?.background || '#1e1e1e'}
            nodeColor={(n) => n.style?.background || '#1e1e1e'}
            maskColor="rgba(0, 0, 0, 0.8)"
            className="bg-dark-800 border-dark-700"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default InvestigationGraph;