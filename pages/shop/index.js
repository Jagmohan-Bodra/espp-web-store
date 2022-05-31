import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import ShopPage from '~/components/pages/shop/shop';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getProductList} from '~/lib/services/product';
import {getProductCategoryList} from '~/lib/services/category';

export async function getServerSideProps() {
  const pageData = await getPageData('master-page');
  const products = await getProductList();
  const categories = await getProductCategoryList();
  const data = {
    categories: categories,
    brands: [],
    colors: [],
    tags: [],
  };
  if (isEmpty(pageData)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData: pageData || null,
      products: products || null,
      data: data || null,
    },
  };
}

export default function Page({pageData, products, data}) {
  const {theme} = pageData || {};
  return (
    <Layout pageData={pageData} titleSeo="Shop">
      <EsppTheme data={(theme || {}).variants || []}>
        <ShopPage products={products} data={data} />
      </EsppTheme>
    </Layout>
  );
}
