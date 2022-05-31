import {parse} from 'qs';
import {isEmpty} from 'validate.js';
import Layout from '~/components/layout/basic-layout';
import Contact from '~/components/pages/contact';
import EsppTheme from '~/components/theme/espp-theme';
import {getItemVariant} from '~/helpers/common';
import {getPageData} from '~/lib/page';
import {sendContact} from '~/lib/services/contact';
import {getRandomString} from '~/helpers/common';
const accessKey = getRandomString(20);

export async function getServerSideProps(context) {
  const {access, data} = parse(context.query);
  var resultsSent = null;
  if (access == accessKey && !isEmpty(data)) {
    resultsSent = await sendContact(data);
  }

  const pageData = await getPageData('contact');
  if (isEmpty(pageData)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData: pageData || null,
      access: accessKey || null,
      resultsSent: resultsSent,
    },
  };
}

export default function Page({pageData, access, resultsSent}) {
  const {theme, variants} = pageData || {};
  return (
    <Layout pageData={pageData}>
      <EsppTheme data={(theme || {}).variants || []}>
        <Contact
          data={getItemVariant(variants, 'contact_image')}
          access={access}
          resultsSent={resultsSent}
        />
      </EsppTheme>
    </Layout>
  );
}
