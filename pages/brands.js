import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import HeaderText from '~/components/pages/brands/header-text';
import ListBrands from '~/components/pages/brands/list-brands';
import EsppTheme from '~/components/theme/espp-theme';
import {getItemVariant} from '~/helpers/common';
import {getPageData} from '~/lib/page';

export async function getServerSideProps() {
  const pageData = await getPageData('brands');
  if (isEmpty(pageData)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData: pageData || null,
    },
  };
}

export default function Page({pageData}) {
  const {theme, variants} = pageData || {};
  return (
    <Layout pageData={pageData}>
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`container`}>
          <HeaderText data={getItemVariant(variants, 'brand_header')} />
          <ListBrands data={getItemVariant(variants, 'brand_list')} />
        </div>
      </EsppTheme>
    </Layout>
  );
}
