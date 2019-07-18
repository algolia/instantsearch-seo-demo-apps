import React, { Component } from 'react';
import { configureRouting } from './URLSyncHelper';
import { AppProps } from './App';

const updateAfter = 700;

const ROUTING = configureRouting();

const withURLSync = (App: React.ComponentType<AppProps>) =>
  class WithURLSync extends Component<
    Omit<AppProps, 'searchState' | 'createURL' | 'onSearchStateChange'>
  > {
    private debouncedSetState: any;

    state: Readonly<{ searchState: any }>;

    constructor(props: any) {
      super(props);
      this.state = {
        searchState: ROUTING.urlToSearchState(props.location),
      };
    }

    componentDidMount() {
      (window as any).addEventListener('popstate', this.onPopState);
    }

    componentWillUnmount() {
      clearTimeout(this.debouncedSetState);
      (window as any).removeEventListener('popstate', this.onPopState);
    }

    onPopState = ({ state }: { state: any }) =>
      this.setState({
        searchState: state || {},
      });

    onSearchStateChange = (searchState: any) => {
      clearTimeout(this.debouncedSetState);

      this.debouncedSetState = setTimeout(() => {
        (window as any).history.pushState(
          searchState,
          null,
          ROUTING.searchStateToURL(searchState)
        );
      }, updateAfter);

      this.setState({ searchState });
    };

    render() {
      const { searchState } = this.state;

      return (
        <App
          {...this.props}
          searchState={searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={ROUTING.searchStateToURL}
        />
      );
    }
  };

export default withURLSync;
