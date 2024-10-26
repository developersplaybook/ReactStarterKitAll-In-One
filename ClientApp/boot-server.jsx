import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { createServerRenderer } from 'aspnet-prerendering';

export default createServerRenderer(async params => {

  const app = (
      <App />
  );

  const html = ReactDOMServer.renderToString(app);

  return {
    html,
    globals: {
      __INITIAL_DATA__: params.data,
    },
  };
});
