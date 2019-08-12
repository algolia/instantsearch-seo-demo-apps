/* eslint-disable import/no-commonjs */
const algoliaSitemap = require('algolia-sitemap');
const get = require('lodash.get');

const alreadyAdded = {};

const MAX_HIERARCHICAL_CATEGORIES_LEVEL = 1;

function hitToParams(hit) {
  const categoriesString = get(
    hit,
    `hierarchicalCategories.lvl${MAX_HIERARCHICAL_CATEGORIES_LEVEL}`
  );
  if (
    !categoriesString ||
    !categoriesString.length ||
    categoriesString in alreadyAdded
  )
    return false;

  alreadyAdded[categoriesString] = true;

  const categorySlug = categoriesString
    .replace(/\s+>\s+/g, '/')
    .replace(/\s+/g, '+');
  const loc = `https://is-seo-ssr-react-0.herokuapp.com/${categorySlug}`;
  return [{ loc }];
}

const config = {
  algoliaConfig: {
    appId: 'latency',
    apiKey: process.env.ADMIN_API_KEY,
    indexName: 'instant_search',
  },
  sitemapLoc: '/static/sitemaps',
  outputFolder: 'dist/static/sitemaps/',
  hitToParams,
};

(async () => {
  try {
    await algoliaSitemap(config);
    // eslint-disable-next-line no-console
    console.log('done');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
})();
