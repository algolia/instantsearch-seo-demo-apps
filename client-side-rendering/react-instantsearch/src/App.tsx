import React, { Component } from 'react';
import qs from 'qs';
import { createInstantSearch } from 'react-instantsearch-dom/server';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { SearchBox, Menu, Hits, InfiniteHits } from './widgets';
import { Location } from 'history';

const { InstantSearch, findResultsState } = createInstantSearch();

const createURL = (state: any): string => `?${qs.stringify(state)}`;

const searchStateToUrl = (
  props: RouteComponentProps,
  searchState: any
): string =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';
const urlToSearchState = (location: Location): object =>
  qs.parse(location.search.slice(1));

export class App extends Component<RouteComponentProps> {
  private onSearchStateChange = (searchState: any) => {
    this.props.history.push(
      searchStateToUrl(this.props, searchState),
      searchState
    );
  };

  public render(): React.ReactNode {
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="instant_search"
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
