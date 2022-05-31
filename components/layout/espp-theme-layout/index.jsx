import React from 'react';
import Head from '~/components/layout/common/head-seo';
import EsppTheme from '~/components/theme/espp-theme';

export default function EsppThemeLayout(props) {
  return (
    <React.Fragment>
      <Head objectSeo={props.pageData} />
      <EsppTheme {...props} />
    </React.Fragment>
  );
}
