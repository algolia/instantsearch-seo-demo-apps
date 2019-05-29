/*
 * Server entrypoint
 *
 * See server configuration in `webpack.config.js`
 */

import React from 'react';
import express from 'express';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter, Route, RouteComponentProps } from 'react-router-dom';
import path from 'path';
import { AddressInfo } from 'net';

import { App, findResultsState } from './App';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

interface Props {
  resultsState: any;
  location: string;
}

const Root = ({ resultsState, location }: Props): JSX.Element => (
  <StaticRouter location={location}>
    <Route
      path="/"
      component={(props: RouteComponentProps) => (
        <App {...props} resultsState={resultsState} />
      )}
    />
  </StaticRouter>
);

app.get('*', async (req, res) => {
  const resultsState = await findResultsState(Root, { location: req.url });
  const initialState = { resultsState };

  res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">

    <link rel="manifest" href="/static/manifest.webmanifest">
    <link rel="shortcut icon" href="/static/favicon.png">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css">
    <link rel="stylesheet" href="/static/index.css">
    <link rel="stylesheet" href="/static/app.css">

    <title>React InstantSearch</title>
  </head>

  <body>
    <header class="header">
      <h1 class="header-title">
        <a href="/">Server-Side Rendering</a>
      </h1>
      <p class="header-subtitle">
        using
        <a href="https://www.algolia.com/doc/api-reference/widgets/react/">
          React InstantSearch
        </a>
      </p>
    </header>

    <div class="container">`);

  const appStream = renderToNodeStream(
    <Root resultsState={resultsState} location={req.url} />
  );
  appStream.pipe(
    res,
    { end: false }
  );

  appStream.on('end', () => {
    res.end(`</div>
    <script>window.__APP_INITIAL_STATE__ = ${JSON.stringify(
      initialState
    )}</script>
    <script src="/static/bundle.js"></script>
  </body>
</html>`);
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, family, port } = server.address() as AddressInfo;
  // eslint-disable-next-line no-console
  console.info(
    `Server (PID ${process.pid}) listening on http://${
      family === 'IPv6' ? `[${address}]` : address
    }:${port} in ${process.env.NODE_ENV || 'unknown'} mode`
  );
});
