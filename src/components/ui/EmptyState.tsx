import React from 'react';
import { cn } from '../../lib/utils';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/20", className)}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
        <Inbox className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
