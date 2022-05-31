import Layout from '~/components/layout/basic-layout';
import SignUpMain from '~/components/pages/auth/sign-up';
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
    <Layout pageData={pageData} titleSeo="Sign Up">
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`container`}>
          <SignUpMain />
        </div>
      </EsppTheme>
    </Layout>
  );
}
