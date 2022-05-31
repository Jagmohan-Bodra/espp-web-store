import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import EsppTheme from '~/components/theme/espp-theme';
import {getPageData} from '~/lib/page';
import {getItemVariant} from '~/helpers/common';
import OurStoryComponent from '~/components/pages/about-us/our-story';

export async function getServerSideProps() {
  const pageData = await getPageData('about-us-our-story');
  if (isEmpty(pageData)) {
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
  const {theme, variants} = pageData || {};
  return (
    <Layout pageData={pageData}>
      <EsppTheme data={(theme || {}).variants || []}>
        <OurStoryComponent data={getItemVariant(variants, 'out_story_block')} />
      </EsppTheme>
    </Layout>
  );
}
