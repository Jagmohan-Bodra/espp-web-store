import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import MissionVisionValues from '~/components/pages/about-us/mission-vision-values';
import EsppTheme from '~/components/theme/espp-theme';
import {getItemVariant} from '~/helpers/common';
import {getPageData} from '~/lib/page';

export async function getServerSideProps() {
  const pageData = await getPageData('about-us-mission-vision-values');
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
        <MissionVisionValues
          data={[
            getItemVariant(variants, 'mission_vision_header_title'),
            getItemVariant(variants, 'mission_vision_header_description'),
            getItemVariant(variants, 'mission_vision_header_slider'),
          ]}
        />
      </EsppTheme>
    </Layout>
  );
}
