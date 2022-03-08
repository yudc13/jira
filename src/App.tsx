import React from 'react';
import './App.css';
import AuthenticatedApp from './authenticated-app';
import { useAuth } from './context/auth-context';
import UnauthenticatedApp from './unauthenticated-app';
import { ErrorBoundary } from '@/components/error-boundary';
import { FullErrorPage } from '@/components/libs';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullErrorPage}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
