import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { createServerRenderer } from 'aspnet-prerendering';

export default createServerRenderer(params => {
  return new Promise((resolve, reject) => {
    const appHTML = renderToString(<App location={params.location.path} />);

    params.domainTasks.then(() => {
      resolve({
        html: appHTML,
        globals: {} // Add any global variables if needed
      });
    }).catch(reject); // Propagate errors
  });
});
