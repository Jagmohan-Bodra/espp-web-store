import Layout from '~/components/layout/basic-layout';
import Criteria from '~/components/pages/about-us/corporate-profile/criteria';
import HeaderText from '~/components/pages/about-us/corporate-profile/header-text';
import TextImage from '~/components/pages/about-us/corporate-profile/text-image';
import EsppTheme from '~/components/theme/espp-theme';
import {getItemVariant} from '~/helpers/common';
import {getPageData} from '~/lib/page';

export async function getServerSideProps() {
  const pageData = await getPageData('about-us-corporate-profile');
  if (!pageData) {
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
        <div className={`container-fluid`}>
          <HeaderText
            data={[
              getItemVariant(variants, 'corporate_profile_header_title'),
              getItemVariant(variants, 'corporate_profile_header_description'),
              getItemVariant(variants, 'corporate_profile_header_content'),
            ]}
          />
          <Criteria
            data={getItemVariant(variants, 'corporate_profile_criteria_cols')}
          />
          <TextImage
            data={[
              getItemVariant(variants, 'corporate_profile_text'),
              getItemVariant(variants, 'corporate_profile_image'),
            ]}
          />
        </div>
      </EsppTheme>
    </Layout>
  );
}
