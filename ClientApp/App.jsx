import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import Frame from './Frame';
import Home from './home/Home';
import Albums from './albums/Albums';
import Photos from './photos/Photos';
import PhotoDetails from './photodetails/PhotoDetails';
import NotFound from './NotFound';
import { GlobalStateProvider } from './contexts/GlobalStateContext';

const App = ({ location }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Update the `isClient` state to true if `window` is defined (i.e., client-side)
    setIsClient(typeof window !== 'undefined');
  }, []);

  const Router = !isClient ? StaticRouter : BrowserRouter;
  const routerProps = !isClient ? { location: location, context: {} } : {};

  return (
    <GlobalStateProvider>
      <Router {...routerProps}>
        <Frame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/photos/:albumId" element={<Photos />} />
            <Route path="/photodetails/:photoId" element={<PhotoDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Frame>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
