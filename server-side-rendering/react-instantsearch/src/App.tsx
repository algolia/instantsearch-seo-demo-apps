import React, { Component } from 'react';
import qs from 'qs';
import { createInstantSearch } from 'react-instantsearch-dom/server';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Configure, SearchBox, Menu, Hits, InfiniteHits } from './widgets';

const { InstantSearch, findResultsState } = createInstantSearch();

const createURL = (state): string => `?${qs.stringify(state)}`;

const searchStateToUrl = (props, searchState): string =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';
const urlToSearchState = (location): object =>
  qs.parse(location.search.slice(1));

interface Props extends RouteComponentProps {
  resultsState: object;
}

export class App extends Component<Props> {
  private onSearchStateChange = searchState => {
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
        resultsState={this.props.resultsState}
        searchState={urlToSearchState(this.props.location)}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
      >
        <Configure />
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
