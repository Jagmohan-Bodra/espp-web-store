import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import PostDetails from '~/components/pages/post';
import {getPageData} from '~/lib/page';
import {getPostDetail} from '~/lib/services/post';

export async function getServerSideProps(context) {
  const pageData = await getPageData('master-page');
  const post = await getPostDetail(context?.params?.id);

  if (isEmpty(pageData) || isEmpty(post)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: post || null,
      pageData: pageData || null,
    },
  };
}

export default function Page({pageData, post}) {
  const {theme} = pageData || {};

  return (
    <Layout pageData={post}>
      <EsppTheme data={(theme || {}).variants || []}>
        <PostDetails post={post} />
      </EsppTheme>
    </Layout>
  );
}
