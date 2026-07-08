import React from 'react';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global notification/websocket listening logic could be initialized here
  return (
    <>
      {children}
    </>
  );
};
