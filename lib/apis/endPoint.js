export default {
  //site
  SITE_LIST: `/v1/site/get-list`,
  SITE_DETAILS: (id) => `/v1/site/${id}`,
  SITE_UPDATE: (id) => `/v1/site/${id}/update`,
  SITE_CREATE: `/v1/site/create`,
  SITE_DELETE: (id) => `/v1/site/${id}/delete`,

  //seo setting
  SEO_SETTING_LIST: `/v1/seo-setting/get-list`,
  SEO_SETTING_DETAILS: (id) => `/v1/seo-setting/${id}`,
  SEO_SETTING_UPDATE: (id) => `/v1/seo-setting/${id}/update`,
  SEO_SETTING_CREATE: `/v1/seo-setting/create`,
  SEO_SETTING_DELETE: (id) => `/v1/seo-setting/${id}/delete`,

  // block
  BLOCK_LIST: `/v1/block/get-list`,
  BLOCK_DETAILS: (id) => `/v1/block/${id}`,
  BLOCK_UPDATE: (id) => `/v1/block/${id}/update`,
  BLOCK_CREATE: `/v1/block/create`,
  BLOCK_DELETE: (id) => `/v1/block/${id}/delete`,

  // page
  PAGE_LIST: `/v1/pages`,
  PAGE_DETAILS: (id) => `/v1/pages/${id}`,
  PAGE_DETAILS_BY_PATH: `/v1/page-url`,
  PAGE_UPDATE: (id) => `/v1/page/${id}/update`,
  PAGE_CREATE: `/v1/page/create`,
  PAGE_DELETE: (id) => `/v1/page/${id}/delete`,

  // post category
  POST_CATEGORY_LIST: `/v1/post-category/get-list`,
  POST_CATEGORY_DETAILS: (id) => `/v1/post-category/${id}`,
  POST_CATEGORY_UPDATE: (id) => `/v1/post-category/${id}/update`,
  POST_CATEGORY_CREATE: `/v1/post-category/create`,
  POST_CATEGORY_DELETE: (id) => `/v1/post-category/${id}/delete`,

  // post
  POST_LIST: `/v1/posts`,
  POST_DETAILS: (id) => `/v1/posts/${id}`,
  POST_UPDATE: (id) => `/v1/post/${id}/update`,
  POST_CREATE: `/v1/post/create`,
  POST_DELETE: (id) => `/v1/post/${id}/delete`,
};
