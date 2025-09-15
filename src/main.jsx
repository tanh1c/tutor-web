import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/modern-design.css'
import App from './App.jsx'

// Error boundary component
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    const handleError = (error) => {
      console.error('Application Error:', error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Something went wrong.</h1>
        <button onClick={() => setHasError(false)}>Try again</button>
      </div>
    );
  }
  
  return children;
}

// Add console logging for debugging
console.log('App starting...');
console.log('Current URL:', window.location.href);

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, rendering app...');
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
