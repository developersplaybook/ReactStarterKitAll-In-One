import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const container = document.getElementById("react-app");

  if (container.hasChildNodes()) {
    // If the container already has content, it means we're hydrating
    hydrateRoot(container, <App />);
  } else {
    // Otherwise, we're just rendering
    createRoot(container).render(<App />);
  }
}

renderApp();
