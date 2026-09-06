import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWidget from '../ui/ChatWidget'; // Import the new widget

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-dark-900 p-8">
        <Outlet />
      </main>
      
      {/* Render the chat widget globally across the dashboard */}
      <ChatWidget />
    </div>
  );
};

export default MainLayout;