import React from 'react';
import { AuthProvider } from './auth-context';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
