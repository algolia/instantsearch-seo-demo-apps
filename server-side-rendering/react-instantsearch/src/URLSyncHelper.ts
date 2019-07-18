import qs from 'qs';

function getCategorySlug(name: string) {
  return name
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

function getCategoryName(slug: string) {
  return slug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

export const configureRouting = () => {
  const createURL = (state: any) => {
    const isDefaultRoute =
      !state.query &&
      state.page === 1 &&
      (state.refinementList && state.refinementList.brand.length === 0) &&
      (state.hierarchicalMenu && !state.hierarchicalMenu['hierarchicalCategories.lvl0']);

    if (isDefaultRoute) {
      return '';
    }

    const categoryPath = state.hierarchicalMenu['hierarchicalCategories.lvl0']
      ? `${getCategorySlug(state.hierarchicalMenu['hierarchicalCategories.lvl0'])}/`
      : '';
    const queryParameters: any = {};

    if (state.query) {
      queryParameters.query = encodeURIComponent(state.query);
    }
    if (state.page !== 1) {
      queryParameters.page = state.page;
    }
    if (state.refinementList.brand) {
      queryParameters.brands = state.refinementList.brand.map(
        encodeURIComponent
      );
    }

    const queryString = qs.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    });

    return `/${categoryPath}${queryString}`;
  };

  const searchStateToURL = (searchState: any) =>
    searchState ? createURL(searchState) : '';

  const urlToSearchState = (location: any) => {
    const pathnameMatches = location.pathname.match(/\/(.*?)\/?$/);
    const category = getCategoryName(
      (pathnameMatches && pathnameMatches[1]) || ''
    );
    const { query = '', page = 1, brands = [] } = qs.parse(
      location.search.slice(1)
    );
    // `qs` does not return an array when there's a single value.
    const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);

    return {
      query: decodeURIComponent(query),
      page,
      hierarchicalMenu: {
        categories: decodeURIComponent(category),
      },
      refinementList: {
        brand: allBrands.map(decodeURIComponent),
      },
    };
  };

  return { urlToSearchState, searchStateToURL };
};
