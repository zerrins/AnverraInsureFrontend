import React from 'react';
import { Skeleton } from '../../components/ui/Skeleton';

export const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-48 h-6" />
    </div>
  );
};
