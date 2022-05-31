import Layout from '~/components/layout/basic-layout';
import ForgotPassword from '~/components/pages/auth/forgot-password';
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
    <Layout pageData={pageData} titleSeo="Forgot Password">
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`container`}>
          <ForgotPassword />
        </div>
      </EsppTheme>
    </Layout>
  );
}
