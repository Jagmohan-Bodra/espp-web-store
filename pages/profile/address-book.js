import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import ProfileLayoutComponent from '~/components/pages/profile/layout';
import AddressBookPage from '~/components/pages/profile/address-book';

export async function getServerSideProps() {
  const pageData = await getPageData('master-page');
  if (!pageData) {
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
  const {theme} = pageData || {};
  return (
    <Layout pageData={pageData} titleSeo="Address Book">
      <EsppTheme data={(theme || {}).variants || []} isHome>
        <ProfileLayoutComponent>
          <AddressBookPage />
        </ProfileLayoutComponent>
      </EsppTheme>
    </Layout>
  );
}
