import React from 'react';
import { InfiniteHits, Highlight } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';

interface Props {
  hit: Hit;
}

const HitComponent = ({ hit }: Props): JSX.Element => (
  <article>
    <h1>
      <Highlight attribute="name" hit={hit} />
    </h1>
    <p>
      <Highlight attribute="description" hit={hit} />
    </p>
    <p>
      <Highlight attribute="brand" hit={hit} />
    </p>
  </article>
);

export default () => <InfiniteHits hitComponent={HitComponent} />;
