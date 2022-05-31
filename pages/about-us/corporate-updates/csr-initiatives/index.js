import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getPostList} from '~/lib/services/post';
import {getObjVariant} from '~/helpers/common';
import CsrInitiatives from '~/components/pages/about-us/corporate-updates/csr-initiatives';

export async function getServerSideProps() {
  const pageData = await getPageData('about-us-csr-initiatives');
  if (isEmpty(pageData)) {
    return {
      notFound: true,
    };
  }

  const posts = await getPostList();
  return {
    props: {
      pageData: pageData || null,
      posts: posts || null,
    },
  };
}

export default function Page({pageData, posts}) {
  const {theme, variants} = pageData || {};
  const objVariant = getObjVariant(variants);

  return (
    <Layout pageData={pageData}>
      <EsppTheme data={(theme || {}).variants || []}>
        <CsrInitiatives data={objVariant} posts={posts} />
      </EsppTheme>
    </Layout>
  );
}
