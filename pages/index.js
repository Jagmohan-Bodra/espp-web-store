import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import HeaderSlider from '~/components/pages/home/header-slider';
import OurStory from '~/components/pages/home/our-story';
import FeaturedProduct from '~/components/pages/home/featured-product';
import BestSeller from '~/components/pages/home/best-seller';
import NewArrival from '~/components/pages/home/new-arrival';
import OurBrandPartner from '~/components/pages/home/our-brand-partner';
import MoreForYou from '~/components/pages/home/more-for-you';
import JoinMailingList from '~/components/pages/home/Join-mailing-list';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getPostList} from '~/lib/services/post';
import {getProductList} from '~/lib/services/product';
import {getItemVariant} from '~/helpers/common';

export async function getServerSideProps() {
  const pageData = await getPageData('home');
  if (isEmpty(pageData)) {
    return {
      notFound: true,
    };
  }

  const posts = await getPostList();
  const featuredProducts = await getProductList({meta: {pageSize: 4, page: 1}});
  const bestSellersProducts = await getProductList({
    meta: {pageSize: 10, page: 1},
  });
  const newArrivalProducts = await getProductList({
    meta: {pageSize: 4, page: 1},
  });

  return {
    props: {
      pageData: pageData || null,
      posts: posts || null,
      featuredProducts: featuredProducts || null,
      bestSellersProducts: bestSellersProducts || null,
      newArrivalProducts: newArrivalProducts || null,
    },
  };
}

export default function Page(props) {
  const {
    pageData,
    posts,
    featuredProducts,
    bestSellersProducts,
    newArrivalProducts,
  } = props;
  const {theme, variants} = pageData || {};
  return (
    <Layout pageData={pageData}>
      <EsppTheme data={(theme || {}).variants || []} isHome>
        <div className={`container-home`}>
          <HeaderSlider
            data={getItemVariant(variants, 'home_header_gallery')}
          />
          <OurStory data={getItemVariant(variants, 'home_our_story')} />
          <FeaturedProduct
            products={featuredProducts}
            sliderData={getItemVariant(variants, 'home_feature_product_left')}
            //productData={getItemVariant(variants, 'home_feature_product_right')}
          />
          <BestSeller
            products={bestSellersProducts}
            //data={getItemVariant(variants, 'home_best_sellers')}
          />
          <NewArrival
            products={newArrivalProducts}
            sliderData={getItemVariant(variants, 'home_new_arrivals_right')}
            //productData={getItemVariant(variants, 'home_new_arrivals_left')}
          />
          <OurBrandPartner
            data={getItemVariant(variants, 'home_our_brand_partners')}
          />
          <MoreForYou
            posts={posts}
            //data={getItemVariant(variants, 'home_more_for_you')}
          />
          <JoinMailingList
            data={getItemVariant(variants, 'join-mailing_list')}
          />
        </div>
      </EsppTheme>
    </Layout>
  );
}
