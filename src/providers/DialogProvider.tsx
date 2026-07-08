import React from 'react';

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      {/* Global dialogs rendered here based on state */}
    </>
  );
};
