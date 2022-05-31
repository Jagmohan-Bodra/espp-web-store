import {getPageList, getPageDetailByPath} from './services/page';
import {getProductList} from './services/product';

export async function getAllPageIds(query = {}) {
  const pagesData = await getPageList(query);
  return (pagesData || []).map((page) => ({
    params: {
      id: page.url.split('/'),
    },
  }));
}

export async function getAllProductIds(query = {}) {
  const urlData = await getProductList(query);
  return ((urlData || {}).data || []).map((page) => ({
    params: {
      id: page.url.split('/'),
    },
  }));
}

export async function getPageData(path = '') {
  return await getPageDetailByPath(path);
}

export async function getAllProductPageIds(query = {}) {
  const pagesData = await getPageList(query);
  return (pagesData || [])
    .map(
      (page) =>
        page.url.indexOf('product/') === 0 && {
          params: {
            id: page.url.replace('product/', '').split('/'),
          },
        },
    )
    .filter((item) => item);
}
