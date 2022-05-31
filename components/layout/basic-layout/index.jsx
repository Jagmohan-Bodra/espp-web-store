import React from 'react';
import Head from '~/components/layout/common/head-seo';

export default function BasicLayout(props) {
  const {pageData, titleSeo} = props;
  return (
    <React.Fragment>
      <Head pageData={pageData} titleSeo={titleSeo} />
      <main>{props.children || null}</main>
    </React.Fragment>
  );
}
