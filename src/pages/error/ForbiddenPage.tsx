import React from 'react';
import { ErrorState } from '../../components/ui/ErrorState';
import { Link } from 'react-router-dom';

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <ErrorState 
        title="403 - Forbidden" 
        message="You do not have permission to access this resource."
        action={<Link to="/" className="text-primary hover:underline">Go back home</Link>}
      />
    </div>
  );
};
