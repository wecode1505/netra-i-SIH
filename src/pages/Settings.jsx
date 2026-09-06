import React from 'react';
import { User, Shield, Bell, Key, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
        <p className="text-gray-400 text-sm">
          Manage your investigator profile, security preferences, and data synchronization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Navigation/Tabs (Static for UI mockup) */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 bg-dark-800 border border-dark-600 text-white px-4 py-3 rounded-lg font-mono text-sm transition-colors">
            <User size={18} className="text-accent-blue" />
            Officer Profile
          </button>
          <button className="w-full flex items-center gap-3 bg-transparent hover:bg-dark-800 border border-transparent hover:border-dark-700 text-gray-400 hover:text-white px-4 py-3 rounded-lg font-mono text-sm transition-colors">
            <Shield size={18} />
            Security & Access
          </button>
          <button className="w-full flex items-center gap-3 bg-transparent hover:bg-dark-800 border border-transparent hover:border-dark-700 text-gray-400 hover:text-white px-4 py-3 rounded-lg font-mono text-sm transition-colors">
            <Bell size={18} />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 bg-transparent hover:bg-dark-800 border border-transparent hover:border-dark-700 text-gray-400 hover:text-white px-4 py-3 rounded-lg font-mono text-sm transition-colors">
            <Database size={18} />
            Data & Export
          </button>
        </div>

        {/* Right Column: Settings Content */}
        <div className="col-span-2 space-y-6">
          
          {/* Profile Section */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-dark-700 pb-2">Identification Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">OFFICER NAME</label>
                <input 
                  type="text" 
                  disabled 
                  value="Sephali Singh" 
                  className="w-full bg-dark-900 border border-dark-700 rounded p-3 text-gray-300 font-mono opacity-75 cursor-not-allowed"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">BADGE / ID NUMBER</label>
                  <input 
                    type="text" 
                    disabled 
                    value="NCRB-9921" 
                    className="w-full bg-dark-900 border border-dark-700 rounded p-3 text-gray-300 font-mono opacity-75 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">CLEARANCE LEVEL</label>
                  <input 
                    type="text" 
                    disabled 
                    value="Level 4 (High)" 
                    className="w-full bg-dark-900 border border-accent-red/50 rounded p-3 text-accent-red font-mono opacity-75 cursor-not-allowed"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 font-mono mt-2">
                * Name and ID modifications require direct authorization from the department administrator.
              </p>
            </div>
          </div>

          {/* Security Toggles Section */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-dark-700 pb-2 flex items-center gap-2">
              <Key size={18} className="text-accent-red" />
              Encryption & Authentication
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</p>
                  <p className="text-xs text-gray-400">Require biometric or token verification on login.</p>
                </div>
                <div className="w-10 h-5 bg-accent-blue rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">End-to-End Chat Encryption</p>
                  <p className="text-xs text-gray-400">Secure Detective Network messages locally.</p>
                </div>
                <div className="w-10 h-5 bg-accent-blue rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;