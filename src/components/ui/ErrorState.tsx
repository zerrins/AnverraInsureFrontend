import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title = "Something went wrong", message, action, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border border-destructive/20 rounded-lg bg-destructive/5 text-destructive", className)}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-destructive/80">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
