import React from 'react';
import { Hits, Highlight, Pagination } from 'react-instantsearch-dom';
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

export default () => (
  <>
    <Hits hitComponent={HitComponent} />
    <div className="pagination">
      <Pagination showFirst={false} showLast={false} totalPages={4} />
    </div>
  </>
);
