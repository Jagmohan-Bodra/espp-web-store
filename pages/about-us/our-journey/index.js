import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import OurJourney from '~/components/pages/about-us/our-journey';
import EsppTheme from '~/components/theme/espp-theme';
import {getItemVariant} from '~/helpers/common';
import {getPageData} from '~/lib/page';

export async function getServerSideProps() {
  const pageData = await getPageData('about-us-our-journey');
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
        <OurJourney
          data={[
            getItemVariant(variants, 'our_journey_title'),
            getItemVariant(variants, 'our_journey_slider'),
          ]}
        />
      </EsppTheme>
    </Layout>
  );
}
