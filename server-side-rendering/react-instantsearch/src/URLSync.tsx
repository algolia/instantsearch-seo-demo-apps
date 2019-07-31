import React, { Component } from 'react';
import { configureParameter, configureRouting } from './URLSyncHelper';
import { AppProps } from './App';
import { Helmet } from 'react-helmet';

const updateAfter = 700;

const ROUTING = configureRouting({
  query: configureParameter('query'),
  page: configureParameter('page'),
  // eslint-disable-next-line @typescript-eslint/camelcase
  free_shipping: configureParameter('toggle.free_shipping'),
  brands: configureParameter('refinementList.brand'),
  category: configureParameter([
    'hierarchicalMenu',
    'hierarchicalCategories.lvl0',
  ]),
  sortBy: configureParameter(['sortBy']),
  hitsPerPage: configureParameter(['hitsPerPage']),
});

const withURLSync = (App: React.ComponentType<AppProps>) =>
  class WithURLSync extends Component<
    Omit<AppProps, 'searchState' | 'createURL' | 'onSearchStateChange'>
  > {
    private debouncedSetState: any;

    public state: Readonly<{ searchState: any }>;

    private constructor(props: any) {
      super(props);
      this.state = {
        searchState: ROUTING.urlToSearchState(
          props.location.pathname,
          props.location.search
        ),
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
        <>
          <Helmet>
            <title>{ROUTING.searchStateToTitle(searchState)}</title>
            <link
              rel="canonical"
              href={ROUTING.searchStateToCanonicalUrl(searchState)}
            />
          </Helmet>
          <App
            {...this.props}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
            createURL={ROUTING.searchStateToURL}
          />
        </>
      );
    }
  };

export default withURLSync;
