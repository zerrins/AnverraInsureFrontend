import React from 'react';
import { useUIStore } from '../store/useUIStore';
import { Menu } from 'lucide-react';
import { GlobalSearch } from '../components/ui/GlobalSearch';
import { useThemeStore } from '../store/useThemeStore';

export const TopNavigation: React.FC = () => {
  const { toggleSidebar } = useUIStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <GlobalSearch className="hidden md:flex" />
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Toggle Theme
        </button>
      </div>
    </header>
  );
};
