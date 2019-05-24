const express = require('express');
const rendertronMiddleware = require('rendertron-middleware');
const { Rendertron } = require('rendertron');

async function startRendertron(rendertronPort) {
  const rendertron = new Rendertron();
  rendertron.port = rendertronPort;

  await rendertron.initialize();

  console.log(`Rendertron started on ${rendertronPort}`);
}

async function start() {
  const rendertronPort = process.env.PORT || 8080;
  const appPort = Number(rendertronPort) + 1;

  await startRendertron(rendertronPort);

  const app = express();

  app.use(
    rendertronMiddleware.makeMiddleware({
      proxyUrl: `http://localhost:${rendertronPort}/render/`,
      timeout: 60 * 1000,
    })
  );

  app.use(express.static('dist'));
  app.listen(appPort, err => {
    if (err) {
      console.error('failed to start server.');
      return;
    }
    console.log(`server started at http://localhost:${appPort}/`);
  });
}

start().catch(e => {
  console.error(e);
});
