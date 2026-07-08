import React from 'react';
import { cn } from '../lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8", className)} {...props}>
      {children}
    </div>
  );
};
