/*
 * Client entrypoint
 *
 * See client configuration in `webpack.config.js`
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppProps } from './App';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';

declare global {
  interface Window {
    __APP_INITIAL_STATE__: any;
  }
}

const Root = ({
  resultsState,
}: {
  resultsState: AppProps['resultsState'];
}): JSX.Element => (
  <BrowserRouter>
    <Route
      path="/"
      component={(props: RouteComponentProps) => (
        <App {...props} resultsState={resultsState} />
      )}
    />
  </BrowserRouter>
);

ReactDOM.hydrate(
  <Root resultsState={window.__APP_INITIAL_STATE__.resultsState} />,
  document.querySelector('#root')
);
