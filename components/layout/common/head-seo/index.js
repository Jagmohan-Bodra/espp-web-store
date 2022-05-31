import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {isEmpty} from 'validate.js';
import {getItemVariant} from '~/helpers/common';
import {siteUrl, getDataSeoFromPage} from '~/lib/utils';
const SITE_NAME = 'ESPP';

export default function HeadSeo(props) {
  const {titleSeo, pageData} = props;
  const seoData = getDataSeoFromPage(pageData);
  const {title, description, keywords, image} = seoData || {};

  // titel SEO
  const titleMeta = !isEmpty(titleSeo) ? titleSeo : title;
  const titleSite = !isEmpty(titleMeta)
    ? titleMeta + ' | ' + SITE_NAME
    : SITE_NAME;

  // image SEO
  const variants =
    (pageData && pageData.theme && pageData.theme.variants) || [];
  const objectlogo = getItemVariant(variants, 'theme_logo');
  const logo = (objectlogo && objectlogo.value) || '';
  const imageSite = !isEmpty(image) ? image : logo + '?type=logo';

  // url SEO
  const router = useRouter();
  const url = siteUrl() + router.asPath;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{titleSite}</title>
      <meta name="description" content={description || titleSite} />
      <meta name="keywords" content={keywords || titleSite} />
      <meta name="robots" content="index, follow" />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content={'website'} />
      <meta name="og:title" property="og:title" content={titleSite} />
      <meta
        name="og:description"
        property="og:description"
        content={description || titleSite}
      />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageSite} />
      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={titleSite} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={imageSite} />
      <link rel="canonical" href={url} />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
      />
      <link href="/css/swiper.css" rel="stylesheet" />
    </Head>
  );
}
