import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface GlobalSearchProps {
  className?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ className }) => {
  return (
    <div className={cn("relative w-full max-w-sm flex items-center", className)}>
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search... (Cmd+K)"
        className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};
