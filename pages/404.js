import Layout from '~/components/layout/basic-layout';
import Page404 from '~/components/pages/pape-404';

export default function Custom404() {
  return (
    <Layout titleSeo={'404 - Page not found'}>
      <div className={`container`}>
        <Page404 />
      </div>
    </Layout>
  );
}
