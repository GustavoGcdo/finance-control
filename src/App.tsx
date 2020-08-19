import React from 'react';
import { AuthProvider } from './contexts/auth.context';
import Routes from './routes';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
