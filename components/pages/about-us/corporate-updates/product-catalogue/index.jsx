import {getValueVariant} from '~/helpers/common';
import ListProductCategory from './list-product-category';
const cssClass = 'about-us-product-catalogue';

const ProductCatalogue = (props) => {
  const data = props.data || [];
  const productCategories = props.productCategories || [];
  const pageTitle = getValueVariant(data, 'product-catalogue-title');
  const content = getValueVariant(data, 'product-catalogue-description') || {};

  return (
    <div className={`${cssClass} container`}>
      <div className={`${cssClass}_header`}>
        <h1 className="common-page-title">{pageTitle || ''}</h1>
        <div dangerouslySetInnerHTML={{__html: content || ''}}></div>
      </div>
      <div className={`${cssClass}_content`}>
        <ListProductCategory data={productCategories} />
      </div>
    </div>
  );
};

export default ProductCatalogue;
