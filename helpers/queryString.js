import qs from 'qs';
import {META_DATA} from '../config';

export const getQueryString = (props) => {
  return props.location.search;
};

export const getQueryBuilder = (query) => {
  return qs.parse(query, {ignoreQueryPrefix: true});
};

export const getSearchUrl = (props) => {
  return qs.parse(props.location.search, {ignoreQueryPrefix: true});
};

export const stringify = (data) => {
  return qs.stringify(data);
};

export const parse = (data) => {
  return qs.parse(data);
};

export const changeUrlQuery = (props, query) => {
  return props.history.replace({search: query});
};

export const getPageFilter = (page, isPageNone) => {
  return {
    meta: {
      pageSize: isPageNone
        ? META_DATA.PAGINATION.PAGE_SIZE_NONE
        : META_DATA.PAGINATION.PAGE_SIZE,
      page: page,
    },
  };
};

export const getSortFilter = (sort) => {
  return {
    meta: {
      sort: sort || [],
    },
  };
};

export const getInFilter = (column, data) => {
  return {
    [column]: {
      in: data,
    },
  };
};

export const getRegexFilter = (column, data) => {
  return {
    [column]: {
      regex: data,
    },
  };
};

export const getEqualFilter = (column, value) => ({
  [column]: {
    equal: value,
  },
});

export const getLargerFilter = (column, number) => {
  return {
    [column]: {
      gte: number,
    },
  };
};

export const getObjectIdFilter = (column, id) => {
  return {
    [column]: {
      objectId: id,
    },
  };
};
