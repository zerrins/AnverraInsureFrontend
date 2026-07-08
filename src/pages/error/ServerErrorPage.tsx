import React from 'react';
import { ErrorState } from '../../components/ui/ErrorState';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <ErrorState 
        title="500 - Server Error" 
        message="An unexpected error occurred on our end. Please try again later."
      />
    </div>
  );
};
