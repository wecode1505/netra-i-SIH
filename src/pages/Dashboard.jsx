import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, ShieldAlert, Fingerprint, ArrowUpRight, Loader2, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MapWidget from '../components/ui/MapWidget';

const Dashboard = () => {
  const [insights, setInsights] = useState([
    { time: '10:42 AM', text: 'Facial recognition match confirmed: Subject tagged in Sector 4 transit feed.' },
    { time: '09:15 AM', text: 'Telemetry anomaly: Encrypted burner signal triangulated near Highland Ave.' },
  ]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [reportText, setReportText] = useState("");

  const metrics = [
    { label: 'Active Targets', value: '04', icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Evidence Scans', value: '47', icon: Fingerprint, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Signal Intercepts', value: '03', icon: BrainCircuit, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Threat Breaches', value: '05', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];

  const runAISweep = async () => {
    if (!reportText.trim()) return; 
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://netra-i-sih.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reportText })
      });
      
      const data = await response.json();
      
      const persons = data.entities.suspects_and_persons.join(", ") || "None Identified";
      const orgs = data.entities.organizations_involved.join(", ") || "None Identified";
      const locs = data.entities.locations_identified.join(", ") || "None Identified";
      
      const newInsight = {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        text: `INTEL SWEEP: Suspects: [${persons}] | Orgs: [${orgs}] | Locations: [${locs}]`
      };

      setInsights(prev => [newInsight, ...prev]);
      setReportText(""); 
    } catch (error) {
      console.error("Extraction failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportPDF = async () => {
    const reportElement = document.getElementById('intel-dossier-panel');
    if (!reportElement) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportElement, { scale: 2, backgroundColor: '#0c121e' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.setFillColor(12, 18, 30);
      pdf.rect(0, 0, 210, 297, 'F');
      pdf.addImage(imgData, 'PNG', 10, 15, imgWidth, imgHeight);
      pdf.save(`NETRA_I_INTELLIGENCE_DOSSIER_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Tactical Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">
              Live Tactical Feed // Netra-i Core
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wider">
            INTELLIGENCE OVERVIEW
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={exportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 px-4 py-2 rounded-xl text-xs font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            EXPORT CLASSIFIED DOSSIER
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${metric.bg}`}>
                <metric.icon size={22} className={metric.color} />
              </div>
              <ArrowUpRight size={18} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-black text-white">{metric.value}</h2>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map Visualization */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col h-[580px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Active Surveillance Radar
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              LEAFLET GEO-INDEXED
            </span>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden border border-slate-800">
            <MapWidget />
          </div>
        </div>

        {/* AI Insight Dossier Panel (Captured by PDF export) */}
        <div 
          id="intel-dossier-panel" 
          className="lg:col-span-1 bg-[#0c121e] border border-slate-800 rounded-2xl p-6 flex flex-col h-[580px] relative"
        >
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <BrainCircuit size={18} className="text-cyan-400" />
              <h3 className="text-xs font-mono text-white uppercase tracking-wider">Automated AI Insights</h3>
            </div>
            <FileText size={14} className="text-slate-500" />
          </div>

          {/* Scrolling Feed */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar font-mono">
            {insights.map((insight, i) => (
              <div key={i} className="border-l-2 border-cyan-500/40 pl-3 py-1">
                <p className="text-[10px] text-cyan-400 font-bold">{insight.time}</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>

          {/* Quick Analyze Tool */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <textarea 
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Paste raw police dispatch/FIR transcript..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none font-mono mb-3 placeholder-slate-600"
              rows="3"
            />
            <button 
              onClick={runAISweep}
              disabled={isAnalyzing || !reportText.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-lg text-xs font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] flex justify-center items-center gap-2 disabled:opacity-40"
            >
              {isAnalyzing ? (
                <><Loader2 size={15} className="animate-spin" /> NLP VECTOR EXTRACTION...</>
              ) : (
                "EXTRACT INTELLIGENCE"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;