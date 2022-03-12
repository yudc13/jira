import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from './auth-context';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
