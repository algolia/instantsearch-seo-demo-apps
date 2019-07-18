import get from 'lodash.get';
import set from 'lodash.set';
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

export const configureParameter = (path: string | string[]) => {
  let stringToState: Function;
  let stateToString: Function;

  const widgetType = Array.isArray(path) ? path[0] : path.split('.')[0];
  switch (widgetType) {
    case 'hierarchicalMenu':
      stateToString = (refinement: string | undefined): string | undefined => {
        if (!refinement) return undefined;
        const categories = refinement.split(/\s*>\s*/).map(getCategorySlug);
        return categories.join('/');
      };
      stringToState = (
        refinement: string | undefined
      ): string[] | undefined => {
        if (!refinement) return undefined;
        return refinement.split('/').map(getCategoryName);
      };
      break;

    case 'refinementList':
      stateToString = (refinements: string[] | undefined): string | undefined =>
        refinements && refinements.length ? refinements.join('-') : undefined;
      stringToState = (refinements: string | undefined): string[] =>
        refinements ? refinements.split('-') : [];
      break;

    case 'toggle':
      stateToString = (refinement: boolean | undefined): string | undefined =>
        refinement ? String(refinement) : undefined;
      stringToState = (refinement: string | undefined): boolean =>
        refinement === 'true';
      break;

    default:
      stringToState = (refinement: string | undefined): string | undefined =>
        refinement;
      stateToString = (refinement: string | undefined): string | undefined =>
        refinement;
  }
  return {
    path,
    widgetType,
    stringToState,
    stateToString,
  };
};
export const configureRouting = (mapping: {
  [s: string]: {
    path: string | string[];
    widgetType: string;
    stringToState: Function;
    stateToString: Function;
  };
}) => {
  const stateToQueryString = (searchState: any, encoder?: Function) => {
    const output = {};
    for (const [queryParam, statePropertyConfig] of Object.entries(mapping)) {
      const value = get(searchState, statePropertyConfig.path);
      set(output, queryParam, statePropertyConfig.stateToString(value));
    }
    if (encoder) {
      return encoder(output);
    } else {
      return qs.stringify(output);
    }
  };

  const queryStringToState = (queryString: string) => {
    const queryParams = qs.parse(queryString);

    const output = {};
    for (const [queryParamPath, statePropertyConfig] of Object.entries(
      mapping
    )) {
      let value = get(queryParams, queryParamPath);
      value = statePropertyConfig.stringToState(value);
      if (value) {
        set(output, statePropertyConfig.path, value);
      }
    }
    return output;
  };

  const searchStateToURL = (searchState: any) => {
    if (!searchState) return '';
    return stateToQueryString(searchState, (queryObject: any) => {
      const { category, ...rest } = queryObject;
      if (category)
        return `/${category}/${qs.stringify(rest, { addQueryPrefix: true })}`;
      return `/${qs.stringify(rest, { addQueryPrefix: true })}`;
    });
  };

  const urlToSearchState = (pathname: string, search: string) => {
    const [category, subcategory]: string[] = pathname.slice(1).split('/');

    const hierarchicalMenu = {
      'hierarchicalCategories.lvl0': `${
        category ? getCategoryName(category) : ''
      }${subcategory ? ` > ${getCategoryName(subcategory)}` : ''}`,
    };
    console.log(queryStringToState(search.slice(1)));
    return {
      hierarchicalMenu,
      ...queryStringToState(search.slice(1)),
    };
  };

  return { urlToSearchState, searchStateToURL };
};
