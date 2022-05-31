import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import ProfileLayoutComponent from '~/components/pages/profile/layout';
import WishlistPage from '~/components/pages/profile/wishlist';

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
  return (
    <Layout pageData={pageData} titleSeo="WishList">
      <EsppTheme data={(theme || {}).variants || []} isHome>
        <ProfileLayoutComponent>
          <WishlistPage />
        </ProfileLayoutComponent>
      </EsppTheme>
    </Layout>
  );
}
