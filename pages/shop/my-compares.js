import {useEffect, useState} from 'react';
import Layout from '~/components/layout/basic-layout';
import MyCompares from '~/components/pages/shop/my-compares';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getCache, toggleCompares} from '~/lib/cache';
import {getProductList} from '~/lib/services/product';
const key = 'compare-product-list';

export async function getServerSideProps() {
  const pageData = await getPageData('master-page');
  return {
    props: {
      pageData: pageData || null,
    },
  };
}

export default function Page({pageData}) {
  const {theme} = pageData || {};
  const [data, setData] = useState([]);
  const idProducts = Object.values(getCache(key));

  useEffect(() => {
    getProductList({
      _id: {
        inObjectId:
          (idProducts || []).length > 0
            ? (idProducts || []).map((item) => item._id)
            : ['123456789012345678901234'],
      },
    }).then((results) => {
      setData(results.data || []);
    });
  }, [idProducts]);

  const removeProduct = (data) => {
    toggleCompares(data);
  };

  return (
    <Layout pageData={pageData} titleSeo="Profile">
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`container`}>
          <MyCompares data={data || []} removeProduct={removeProduct} />
        </div>
      </EsppTheme>
    </Layout>
  );
}
