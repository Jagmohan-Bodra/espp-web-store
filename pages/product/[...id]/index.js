import React, {useEffect, useState} from 'react';
import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import PrductDetailInfo from '~/components/pages/shop/product-detail/detail-info';
import ProductsSuggested from '~/components/pages/shop/product-detail/products-suggested';
import PrductDetailCMS from '~/components/pages/shop/product-detail/product-detail-cms';
import EsppTheme from '~/components/theme/espp-theme';
import {getCache} from '~/lib/cache';
import {getPageData} from '~/lib/page';
import {getProductDetail, getProductList} from '~/lib/services/product';
const key = 'recently-view-product-list';

export async function getServerSideProps(context) {
  const data = await getProductDetail(context?.params?.id);
  const pageData = await getPageData('master-page');
  if (!data || !pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData: pageData || null,
      data: data || null,
    },
  };
}

export default function Page({pageData, data}) {
  const {theme} = pageData || {};
  const [dataRecency, setDataRecency] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const idList = setDataRecency(Object.values(getCache(key)));

    let brandsId = [];
    if (!isEmpty(data.brands)) {
      data.brands.map((item) => brandsId.push(item._id));
    }
    getProductList({
      'brands._id': {inObjectId: brandsId},
    }).then((results) => {
      setProductList(results.data || []);
    });

    getProductList({
      _id: {
        inObjectId:
          (idList || []).length > 0
            ? (idList || []).map((item) => item._id)
            : ['123456789012345678901234'],
      },
    }).then((results) => {
      setDataRecency(results.data || []);
    });
  }, []);

  return (
    <Layout pageData={pageData} titleSeo="Product">
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`product-single-page container-fluid`}>
          <PrductDetailInfo data={data} isProductSinglePage />
          <PrductDetailCMS title="PRODUCT DETAIL" data={data} />
          <ProductsSuggested
            title="YOU MAY ALSO LIKE"
            data={(productList || []).filter(
              (item) => (item || {})._id != (data || {})._id,
            )}
          />
          <ProductsSuggested
            title="RECENTLY VIEWED"
            data={(dataRecency || []).filter(
              (item) => (item || {})._id != (data || {})._id,
            )}
          />
        </div>
      </EsppTheme>
    </Layout>
  );
}
