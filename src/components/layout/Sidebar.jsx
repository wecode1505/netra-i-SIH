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
  Scan
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
    <div className="w-64 bg-dark-900 border-r border-dark-700 h-screen flex flex-col pt-6 z-50">
      <div className="flex items-center gap-3 px-6 mb-8 text-white">
        <Scan className="text-accent-blue" size={28} />
        <span className="font-bold text-xl tracking-wider">Netra-i</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-dark-800 text-white border-l-2 border-accent-red' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-800/50'
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-700">
        <div className="flex items-center justify-between bg-dark-800 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-red/20 border border-accent-red flex items-center justify-center text-accent-red font-bold text-xs">
              01
            </div>
            <div>
              <p className="text-xs text-white font-medium">Officer S. Singh</p>
              <p className="text-[10px] text-gray-500 font-mono">NCRB-9921</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;