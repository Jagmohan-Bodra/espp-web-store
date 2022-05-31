import {} from 'validate.js';

export function siteUrl() {
  return typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';
}

export function getHostName() {
  return typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : '';
}

export function getDataSeoFromPage(objectSeo) {
  const {seoProps, name, title, description, image} = objectSeo || {};
  const _title = name || title || '';
  const metaSeo = seoProps || {};
  let titleSeo = metaSeo.title ? metaSeo.title : _title;
  let descriptSeo = metaSeo.description ? metaSeo.description : description;
  let keywordSeo = metaSeo.keyword ? metaSeo.keyword : _title;
  let imageSeo = metaSeo.images ? metaSeo.images : image;

  return {
    title: titleSeo,
    description: descriptSeo,
    keyword: keywordSeo,
    image: imageSeo,
  };
}

export function getPathUrl(asPath = '', number) {
  if (asPath !== '') {
    var list = asPath.split('/');
    if (list && list[number] && list[number] != '[...id]') {
      return list[number];
    }
  }
  return;
}
