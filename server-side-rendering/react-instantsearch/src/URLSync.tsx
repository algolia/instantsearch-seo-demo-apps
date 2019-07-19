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

    public state: Readonly<{ searchState: any }>;

    private constructor(props: any) {
      super(props);
      this.state = {
        searchState: ROUTING.urlToSearchState(props.location),
      };
    }

    public componentDidMount() {
      window.addEventListener('popstate', this.onPopState);
    }

    public componentWillUnmount() {
      clearTimeout(this.debouncedSetState);
      window.removeEventListener('popstate', this.onPopState);
    }

    private onPopState = ({ state }: { state: any }) =>
      this.setState({
        searchState: state || {},
      });

    public onSearchStateChange = (searchState: any) => {
      clearTimeout(this.debouncedSetState);

      this.debouncedSetState = setTimeout(() => {
        window.history.pushState(
          searchState,
          '',
          ROUTING.searchStateToURL(searchState)
        );
      }, updateAfter);

      this.setState({ searchState });
    };

    public render() {
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
