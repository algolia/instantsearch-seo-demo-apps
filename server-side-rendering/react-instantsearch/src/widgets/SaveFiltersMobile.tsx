import React from 'react';
import { connectStats } from 'react-instantsearch-dom';
import { formatNumber } from '../utils';

const SaveFiltersMobile = ({
  nbHits,
  onClick,
}: {
  nbHits: number;
  onClick: () => void;
}) => (
  <button className="button button-primary" onClick={onClick}>
    See {formatNumber(nbHits)} results
  </button>
);

export default connectStats(SaveFiltersMobile);
