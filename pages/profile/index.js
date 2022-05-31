import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getSettingByKey} from '~/lib/services/setting';
import ProfileLayoutComponent from '~/components/pages/profile/layout';
import ProfilePage from '~/components/pages/profile/profile';

export async function getServerSideProps() {
  const pageData = await getPageData('master-page');
  const currencySetting = await getSettingByKey('CURRENCY_SETTING');
  return {
    props: {
      pageData: pageData || null,
      currencySetting: currencySetting || null,
    },
  };
}

export default function Page({pageData, currencySetting}) {
  const {theme} = pageData || {};
  return (
    <Layout pageData={pageData} titleSeo="Profile">
      <EsppTheme data={(theme || {}).variants || []} isHome>
        <ProfileLayoutComponent>
          <ProfilePage currencySetting={currencySetting} />
        </ProfileLayoutComponent>
      </EsppTheme>
    </Layout>
  );
}
