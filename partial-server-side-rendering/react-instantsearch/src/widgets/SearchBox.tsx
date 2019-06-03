import React from 'react';

import { SearchBox } from 'react-instantsearch-dom';

export default () => (
  <SearchBox
    translations={{
      placeholder: 'Search for a product, brand, color, …',
    }}
  />
);
