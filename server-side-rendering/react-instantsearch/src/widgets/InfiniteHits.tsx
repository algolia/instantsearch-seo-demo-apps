import React from 'react';
import {
  InfiniteHits,
  Hits,
  Highlight,
  Snippet,
} from 'react-instantsearch-dom';

interface Props {
  hit: Hits;
}

const Hit = ({ hit }: Props): React.ReactNode => (
  <article>
    <header>
      <img src={hit.image} alt={hit.name} />
    </header>
    <p>{hit.categories[0]}</p>
    <h1>
      <Highlight attribute="name" hit={hit} />
    </h1>
    <p>
      <Snippet attribute="description" hit={hit} />
    </p>
    <footer>
      <p>
        <span>$</span> <strong>{hit.price}</strong>
      </p>
    </footer>
  </article>
);

export default () => <InfiniteHits hitComponent={Hit} />;
