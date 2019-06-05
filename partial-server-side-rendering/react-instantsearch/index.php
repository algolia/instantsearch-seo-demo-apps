<?php

require __DIR__ . '/vendor/autoload.php';

$client = Algolia\AlgoliaSearch\SearchClient::create(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

$index = $client->initIndex('instant_search');

$facetFilters = array();
if (isset($_GET['menu'])) {
  foreach ($_GET['menu'] as $key => $value) {
      array_push($facetFilters, $key . ':' . $value);
  }
}

$searchParameters = array(
  'query' => isset($_GET['query']) ? $_GET['query'] : '',
  'page' => isset($_GET['page']) ? $_GET['page'] - 1 : 0,
  'highlightPreTag'=> '<em class="ais-Highlight-highlighted">',
  'highlightPostTag'=> '</em>',
  'facetFilters' => $facetFilters
);

$results = $index->search($searchParameters['query'], $searchParameters);

$initialState = array(
  'resultsState' => array(
    'state' => $searchParameters,
    '_originalResponse' => array(
      'results' => [$results]
    )
  )
);

require 'src/template.html';

?>
