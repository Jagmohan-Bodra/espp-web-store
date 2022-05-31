import Layout from '~/components/layout/basic-layout';
import CheckingPage from '~/components/pages/checking';
import {SETTING_KEY} from '~/constants/master-data';
import {getPageData} from '~/lib/page';
import {getSettingList} from '~/lib/services/setting';

export async function getServerSideProps() {
  const pageData = await getPageData('master-page');
  const settings = await getSettingList({
    key: {in: SETTING_KEY.PAYMENT_SETTING},
  });

  return {
    props: {
      pageData: pageData || null,
      settings: settings || null,
    },
  };
}

export default function Page({pageData, settings}) {
  return (
    <Layout pageData={pageData} titleSeo="Checking">
      <CheckingPage settings={settings} />
    </Layout>
  );
}
