import React from 'react';

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      {/* Global drawers rendered here */}
    </>
  );
};
