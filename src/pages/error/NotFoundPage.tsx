import React from 'react';
import { EmptyState } from '../../components/ui/EmptyState';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <EmptyState 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist or has been moved."
        action={<Link to="/" className="text-primary hover:underline">Go back home</Link>}
      />
    </div>
  );
};
