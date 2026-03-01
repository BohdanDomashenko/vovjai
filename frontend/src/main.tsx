import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactGA from 'react-ga4';

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = 'G-Q3KMEW32P1';
if (import.meta.env.PROD) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
