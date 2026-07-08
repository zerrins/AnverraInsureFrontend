import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { CommandPalette } from '../components/ui/CommandPalette';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans antialiased text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
};
