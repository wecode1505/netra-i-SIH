import React from 'react';
import { Lock } from 'lucide-react';

const Messages = () => {
  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Secure Investigation Chat</h1>
      </div>

      <div className="flex-1 bg-dark-800 border border-dark-700 rounded-xl flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-dark-900 rounded-full border border-dark-700">
              <Lock size={32} className="text-gray-500" />
            </div>
          </div>
          <h2 className="text-white font-bold text-lg mb-2 font-mono">ENCRYPTED CHANNEL</h2>
          <p className="text-gray-400 text-sm">
            Messaging unlocks only after a collaboration request is accepted by both investigators. 
            Navigate to the Detective Network to initiate secure connections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;