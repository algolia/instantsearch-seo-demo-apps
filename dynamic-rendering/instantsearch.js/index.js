const express = require('express');
const rendertronMiddleware = require('rendertron-middleware');

const app = express();

app.use(
  rendertronMiddleware.makeMiddleware({
    // rendertron has been deployed on a separate app as it's too complicated to open two ports on heroku
    proxyUrl: `https://<MY_RENDERTRON_INSTANCE>/render/`,
    timeout: 60 * 1000,
  })
);

app.get('/robots.txt', (req, res, next) => {
  res.sendFile('./robots.txt', { root: __dirname }, err => {
    if (err) return next(err);
    return null;
  });
});

app.use('/sitemaps', express.static('sitemaps'));
app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) {
    console.error('failed to start server.');
    return;
  }
  console.log(`server started at http://localhost:${port}/`);
});
