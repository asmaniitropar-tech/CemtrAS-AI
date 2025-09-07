import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ChatHistoryProvider } from './contexts/ChatHistoryContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './i18n'; // Initialize i18n
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ChatHistoryProvider>
          <App />
        </ChatHistoryProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
