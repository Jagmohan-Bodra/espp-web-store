import Layout from '~/components/layout/basic-layout';
import ThankYouRegister from '~/components/pages/auth/sign-up/sign-up-thank-you';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';

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
    <Layout pageData={pageData} titleSeo="sign-up">
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`container`}>
          <ThankYouRegister />
        </div>
      </EsppTheme>
    </Layout>
  );
}
