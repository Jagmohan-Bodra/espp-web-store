import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getProductCategoryList} from '~/lib/services/category';
import {getObjVariant} from '~/helpers/common';
import ProductCatalogue from '~/components/pages/about-us/corporate-updates/product-catalogue';

export async function getServerSideProps() {
  const pageData = await getPageData('about-us-product-catalogue');
  if (isEmpty(pageData)) {
    return {
      notFound: true,
    };
  }

  const productCategories = await getProductCategoryList();
  return {
    props: {
      pageData: pageData || null,
      productCategories: productCategories || null,
    },
  };
}

export default function Page({pageData, productCategories}) {
  const {theme, variants} = pageData || {};
  const objVariant = getObjVariant(variants);

  return (
    <Layout pageData={pageData}>
      <EsppTheme data={(theme || {}).variants || []}>
        <ProductCatalogue
          data={objVariant}
          productCategories={productCategories}
        />
      </EsppTheme>
    </Layout>
  );
}
