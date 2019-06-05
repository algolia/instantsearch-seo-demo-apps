import React, { Component } from 'react';
import qs from 'qs';
import { createInstantSearch } from 'react-instantsearch-dom/server';
import algoliasearch from 'algoliasearch/lite';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { SearchBox, Menu, Hits, InfiniteHits } from './widgets';
import { Location } from 'history';

interface Props extends RouteComponentProps {
  resultsState: object;
}

const { InstantSearch, findResultsState } = createInstantSearch();

const createURL = (state: any): string => `?${qs.stringify(state)}`;

const searchStateToUrl = (props: Props, searchState: any): string =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';
const urlToSearchState = (location: Location): object =>
  qs.parse(location.search.slice(1));

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export class App extends Component<Props> {
  private onSearchStateChange = (searchState: any) => {
    this.props.history.push(
      searchStateToUrl(this.props, searchState),
      searchState
    );
  };

  public render(): React.ReactNode {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        resultsState={this.props.resultsState}
        searchState={urlToSearchState(this.props.location)}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
      >
        <div className="search-panel">
          <div className="search-panel__results">
            <div className="menu">
              <Menu />
            </div>
            <div className="searchbox">
              <SearchBox />
            </div>
            <Switch>
              <Route path="/infinitehits" component={InfiniteHits} />
              <Route path="*" component={Hits} />
            </Switch>
          </div>
        </div>
      </InstantSearch>
    );
  }
}

export { findResultsState };
