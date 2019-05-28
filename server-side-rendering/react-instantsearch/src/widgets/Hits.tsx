import React from 'react';
import { Hits, Highlight, Pagination, Snippet } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';

interface Props {
  hit: Hit;
}

const HitComponent = ({ hit }: Props): JSX.Element => (
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

export default () => (
  <>
    <Hits hitComponent={HitComponent} />
    <div className="pagination">
      <Pagination showFirst={false} showLast={false} totalPages={4} />
    </div>
  </>
);
