import {EyeOutlined} from '@ant-design/icons';
import {isEmpty} from 'validate.js';
import PrductDetailInfoQuickView from '~/components/pages/shop/product-detail/detail-info-quickview';
import {checkImage} from '~/helpers/common';
import openCartDetailsModal from '~/components/function-component/carts/cart-details-modal';
import {createCart} from '~/components/function-component/carts/common';
import {
  openPublicModal,
  closePublicModal,
} from '~/components/modals/public-modal/common';

const ProductCard = (props) => {
  const {
    name,
    imagesFullPath,
    description,
    publicPrice,
    shortCode,
    id,
    membershipPrice,
  } = props.item || {};

  const handleAddToCart = () => {
    createCart(id).then((carts) => {
      openCartDetailsModal(carts.id);
    });
  };

  const closeModal = () => {
    closePublicModal();
  };

  const formPrductDetailInfo = () => {
    return (
      <PrductDetailInfoQuickView
        header={null}
        data={props.item}
        classWrap="wrap_quickview"
        isHidden
        closeModal={closeModal}
      />
    );
  };

  const onQuickView = () => {
    openPublicModal(
      {
        className: 'modal-quick-view-product-info',
        bodycomponent: formPrductDetailInfo,
        data: {default: true},
        isNullFooter: true,
      },
      handleAddToCart,
    );
  };

  const privatePrice =
    Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
      ? membershipPrice
      : undefined;

  const imageMain =
    !isEmpty(imagesFullPath) && imagesFullPath.length > 0 && imagesFullPath[0];
  const imageSecond =
    !isEmpty(imagesFullPath) && imagesFullPath.length > 0 && imagesFullPath[1];

  return (
    <div className={`component-product-cart`}>
      <div className={`component-product-cart_image_group`}>
        <button
          className={`component-product-cart_image_group_block_btn btn_quickview`}
          onClick={onQuickView}>
          <EyeOutlined style={{fontSize: '20px'}} />
        </button>
        <a
          href={`/product/${shortCode}`}
          className={`component-product-cart_image_group_a`}>
          <img
            className={`component-product-cart_image_group_img`}
            src={checkImage(imageMain)}
          />
          {imageSecond && (
            <img
              className={`component-product-cart_image_group_img product-image-hover`}
              src={checkImage(imageSecond)}
            />
          )}
        </a>
        <div className={`component-product-cart_image_group_block`}>
          <button
            className={`component-product-cart_image_group_block_btn`}
            onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <div className={`component-product-cart_content_group`}>
        <div className={`component-product-cart_content_group_name`}>
          <a href={`/product/${shortCode}`}>{name}</a>
        </div>
        <div className={`component-product-cart_content_group_description`}>
          {description}
        </div>
        <div className={`component-product-cart_content_group_price`}>
          <span
            className={`component-product-cart_content_group_price_public`}
            style={privatePrice ? {textDecoration: 'line-through'} : {}}>
            S${publicPrice}
          </span>
          <span
            className={`component-product-cart_content_group_price_private`}>
            {privatePrice ? `S$${privatePrice}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
