import React from 'react';
import { useUIStore } from '../store/useUIStore';
import { cn } from '../lib/utils';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-50 h-screen w-[260px] bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-14 items-center border-b px-6">
        <span className="font-bold text-lg tracking-tight">AnverraGlobal</span>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink 
          to="/" 
          className={({isActive}) => cn("flex items-center px-3 py-2 rounded-md text-sm font-medium", isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground")}
        >
          Dashboard
        </NavLink>
      </nav>
    </aside>
  );
};
