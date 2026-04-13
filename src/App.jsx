import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import theme from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CaseManagement from './pages/CaseManagement';
import Clients from './pages/Clients';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const ErrorFallback = ({ error }) => (
  <div role="alert" className="error-fallback">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cases" element={<CaseManagement />} />
            <Route path="clients" element={<Clients />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
