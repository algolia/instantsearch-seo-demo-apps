/*
 * Client entrypoint
 *
 * See client configuration in `webpack.config.js`
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';

declare global {
  interface Window {
    __APP_INITIAL_STATE__: any;
  }
}

interface Props {
  resultsState: any;
}

const Root = ({ resultsState }: Props): JSX.Element => (
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
  document.querySelector('.container')
);
