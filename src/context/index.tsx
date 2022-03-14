import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from './auth-context';
import { Provider } from 'react-redux';
import { store } from '@/store';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
