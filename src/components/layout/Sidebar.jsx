import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Network, 
  Files, 
  Users, 
  MessageSquare, 
  GraduationCap, 
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Cases', path: '/cases', icon: Briefcase },
    { name: 'Investigation Graph', path: '/graph', icon: Network },
    { name: 'Evidence', path: '/evidence', icon: Files },
    { name: 'Detective Network', path: '/network', icon: Users },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Training Simulator', path: '/simulator', icon: GraduationCap },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-dark-900/80 backdrop-blur-xl border-r border-dark-700 h-screen flex flex-col pt-6 z-40 relative">
      <div className="flex items-center gap-3 px-6 mb-8 text-white">
        <div className="p-2 bg-gradient-to-br from-accent-cyan to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <ShieldCheck className="text-white" size={24} />
        </div>
        <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Netra-i</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold ${
                isActive 
                  ? 'bg-gradient-to-r from-accent-cyan/20 to-transparent text-white border-l-4 border-accent-cyan shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-800 border-l-4 border-transparent'
              }`
            }
          >
            {/* The Fix: We use a function block here to safely pass the string to the icon */}
            {({ isActive }) => (
              <>
                <item.icon size={18} className={isActive ? "text-accent-cyan" : "text-gray-400"} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="flex items-center justify-between bg-dark-800/50 border border-dark-700 rounded-xl p-3 hover:bg-dark-700 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-indigo to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              SS
            </div>
            <div>
              <p className="text-xs text-white font-bold">Officer S. Singh</p>
              <p className="text-[10px] text-accent-cyan font-mono tracking-widest">NCRB-9921</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-accent-red transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;