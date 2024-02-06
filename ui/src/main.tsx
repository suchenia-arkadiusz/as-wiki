import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToasterProvider } from './contexts/ToasterContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </BrowserRouter>
  </React.StrictMode>
);
