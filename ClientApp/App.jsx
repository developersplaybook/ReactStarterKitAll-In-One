import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter, StaticRouter } from 'react-router-dom';
import Frame from './Frame';
import Home from './home/Home';
import Albums from './albums/Albums';
import Photos from './photos/Photos';
import LoginOutForm from './user/LoginOutForm';
import PhotoDetails from './photodetails/PhotoDetails';
import NotFound from './NotFound';
import { GlobalStateProvider } from './contexts/GlobalStateContext';

const App = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Update the `isClient` state to true if `window` is defined (i.e., client-side)
    setIsClient(typeof window !== 'undefined');
  }, []);

  const Router = !isClient ? StaticRouter : BrowserRouter;
  const routerProps = !isClient ? { location: props.location, context: {} } : {};

  return (
    <GlobalStateProvider>
        <Router {...routerProps}>
          <Frame>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/albums" component={!isClient ? NotFound : Albums} />
              <Route path="/photos/:albumId" render={!isClient ? NotFound : (props) => <Photos {...props} />} />
              <Route path="/photodetails/:photoId" component={!isClient ? NotFound : PhotoDetails} />
              <Route path="/user" component={!isClient ? NotFound : LoginOutForm} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Frame>
        </Router>
    </GlobalStateProvider>
  );
};

export default App;
