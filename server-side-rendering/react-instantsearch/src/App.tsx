import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createInstantSearch } from 'react-instantsearch-dom/server';
import {
  Configure,
  SearchBox,
  ClearRefinements,
  HierarchicalMenu,
  RefinementList,
  ToggleRefinement,
  Panel,
  SortBy,
  HitsPerPage,
  Hits,
  Pagination,
} from 'react-instantsearch-dom';

import Ratings from './widgets/Ratings';
import withURLSync from './URLSync';
import NoResults from './widgets/NoResults';
import Hit from './widgets/Hit';

import AlgoliaSvg from './AlgoliaSvg';

export interface AppProps extends RouteComponentProps {
  resultsState: object;
  searchState: object;
  onSearchStateChange: Function;
  createURL: Function;
}

const { InstantSearch, findResultsState } = createInstantSearch();

export class AppComponent extends Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="instant_search"
        resultsState={this.props.resultsState}
        searchState={this.props.searchState}
        onSearchStateChange={this.props.onSearchStateChange}
        createURL={this.props.createURL}
      >
        <a className="lighthouse-report-button" href="/lighthouse-report.html">
          Lighthouse SEO report
        </a>
        <header className="header">
          <p className="header-logo">
            <AlgoliaSvg />
          </p>
          <p className="header-title"> Stop looking for an item — find it. </p>
          <SearchBox
            translations={{
              placeholder: 'Product, brand, color, …',
            }}
            submit={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 18 18"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.67"
                  transform="translate(1 1)"
                >
                  <circle cx="7.11" cy="7.11" r="7.11" />
                  <path d="M16 16l-3.87-3.87" />
                </g>
              </svg>
            }
          />
        </header>

        <Configure
          attributesToSnippet={['description:10']}
          snippetEllipsisText="…"
          removeWordsIfNoResults="allOptional"
        />

        <main className="container">
          <div className="container-wrapper">
            <section className="container-filters" onKeyUp={() => null}>
              <div className="container-header">
                <h2>Filters</h2>

                <div className="clear-filters" data-layout="desktop">
                  <ClearRefinements
                    translations={{
                      reset: (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                          >
                            <g fill="none" fillRule="evenodd" opacity=".4">
                              <path d="M0 0h11v11H0z" />
                              <path
                                fill="#000"
                                fillRule="nonzero"
                                d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                              />
                            </g>
                          </svg>
                          Clear filters
                        </>
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="container-body">
                <Panel header="Category">
                  <HierarchicalMenu
                    attributes={[
                      'hierarchicalCategories.lvl0',
                      'hierarchicalCategories.lvl1',
                    ]}
                  />
                </Panel>
                <Panel header="Brands">
                  <RefinementList
                    attribute="brand"
                    searchable={true}
                    translations={{
                      placeholder: 'Search for brands…',
                    }}
                  />
                </Panel>
                <Panel header="Free shipping">
                  <ToggleRefinement
                    attribute="free_shipping"
                    label="Display only items with free shipping"
                    value={false}
                  />
                </Panel>
                <Panel header="Ratings">
                  <Ratings attribute="rating" />
                </Panel>
              </div>
            </section>
          </div>

          <section className="container-results">
            <header className="container-header container-options">
              <SortBy
                className="container-option"
                defaultRefinement="instant_search"
                items={[
                  {
                    label: 'Sort by featured',
                    value: 'instant_search',
                  },
                  {
                    label: 'Price ascending',
                    value: 'instant_search_price_asc',
                  },
                  {
                    label: 'Price descending',
                    value: 'instant_search_price_desc',
                  },
                ]}
              />

              <HitsPerPage
                className="container-option"
                items={[
                  {
                    label: '16 hits per page',
                    value: 16,
                  },
                  {
                    label: '32 hits per page',
                    value: 32,
                  },
                  {
                    label: '64 hits per page',
                    value: 64,
                  },
                ]}
                defaultRefinement={16}
              />
            </header>
            <Hits hitComponent={Hit} />
            <NoResults />
            <footer className="container-footer">
              <Pagination
                padding={2}
                showFirst={false}
                showLast={false}
                translations={{
                  previous: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.143"
                      >
                        <path d="M9 5H1M5 9L1 5l4-4" />
                      </g>
                    </svg>
                  ),
                  next: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.143"
                      >
                        <path d="M1 5h8M5 9l4-4-4-4" />
                      </g>
                    </svg>
                  ),
                }}
              />
            </footer>
          </section>
        </main>
      </InstantSearch>
    );
  }
}
export const App = withURLSync(AppComponent);
export { findResultsState };
