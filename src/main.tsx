import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './context/AppContext.tsx';
import { SaaSProvider } from './context/SaaSContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SaaSProvider>
      <AppProvider>
      <App />
    </AppProvider>
    </SaaSProvider>
  </StrictMode>,
);
