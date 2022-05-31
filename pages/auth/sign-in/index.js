import Router from 'next/router';
import Layout from '~/components/layout/basic-layout';
import SignIn from '~/components/pages/auth/sign-in';
import EsppTheme from '~/components/theme/espp-theme';
import pathRouter from '~/constants/path-router';
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
  const onFinish = () => {
    Router.push({pathname: pathRouter.ROOT});
  };

  return (
    <Layout pageData={pageData} titleSeo="Sign In">
      <EsppTheme data={(theme || {}).variants || []}>
        <div className={`container`}>
          <SignIn onFinish={onFinish} />
        </div>
      </EsppTheme>
    </Layout>
  );
}
