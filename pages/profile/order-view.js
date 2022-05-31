import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import ProfileLayoutComponent from '~/components/pages/profile/layout';
import OrderViewPage from '~/components/pages/profile/order-history/OrderView';

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
    <Layout pageData={pageData} titleSeo="Order Details">
      <EsppTheme data={(theme || {}).variants || []} isHome>
        <ProfileLayoutComponent>
          <OrderViewPage />
        </ProfileLayoutComponent>
      </EsppTheme>
    </Layout>
  );
}
