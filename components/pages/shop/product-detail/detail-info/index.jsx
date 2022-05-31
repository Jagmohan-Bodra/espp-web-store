import React, {useEffect, useState} from 'react';
import {Row, Col, Input} from 'reactstrap';
import {Swipers} from '~/components/public/swiper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import ModalEnquiryUs from '../modal-enquiry-us';
import PropTypes from 'prop-types';
import {createCart} from '~/components/function-component/carts/common';
import {checkCompares, toggleCompares, toggleRecentlyView} from '~/lib/cache';
import openCartDetailsModal from '~/components/function-component/carts/cart-details-modal';
import {HeartRegularIcon, HeartSolidIcon} from '~/lib/icons';
import {useDispatch, useSelector} from 'react-redux';
import {isArray, isEmpty} from 'validate.js';
import {createWishlist, deleteWishlist} from '~/lib/services/wishlist';
import {reqGetMe} from '~/reduxs/me/action';
const clsName = 'product-detail-info';

//TOD: DATA MOCK => Change apis when has apis
const productColors = [
  {key: 'blue', name: 'Blue'},
  {key: 'green', name: 'Green'},
  {key: '#fd3b1d', name: 'Red'},
];

const PrductDetailInfo = (props) => {
  const dispatch = useDispatch();
  const {data, isQuickView} = props;
  const me = useSelector((state) => state.me.data) || {};
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCompare, setIsCompore] = useState(false);
  const [color, setColor] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [product, setProduct] = useState({});
  const [slideTo, setSlideTo] = useState(0);
  const {wishlist} = me || {};
  const isWishList = !!(wishlist || []).find((item) => item.product == data.id);

  useEffect(() => {
    setIsCompore(checkCompares(data.id));
    setColor(((data.colors || {})[0] || {}).name || '');
    // getProductDetailUrl(id).then((result) => setProduct(result));
    setProduct(data);
    toggleRecentlyView({id: data.id});
  }, []);

  const handleAddOrder = () => {
    createCart(data.id, quantity).then((carts) => {
      openCartDetailsModal(carts.id);
      // ** TODO **
      // show message sucess
      // openPublicModal({
      //   header: 'Add to order',
      //   body: <CartDetails id={carts.id} />,
      //   width: '1200px',
      //   isNullFooter: true,
      // });
    });
    props.closeModal && props.closeModal();
  };

  const addToCompares = () => {
    toggleCompares({id: product.id});
    setIsCompore(checkCompares(product.id));
  };

  const privatePrice =
    Number.parseFloat((product || {}).membershipPrice) <
    Number.parseFloat((data || {}).publicPrice)
      ? (product || {}).membershipPrice
      : undefined;

  const onWishlistClick = () => {
    const item = (wishlist || []).find((item) => item.product == data.id);
    if (!!item) {
      deleteWishlist(item.id).then(() => {
        dispatch(reqGetMe());
      });
      return;
    }
    createWishlist({productId: data.id}).then(() => {
      dispatch(reqGetMe());
    });
  };

  const getProductBrands = () => {
    const brands = data.brands || [];
    return !isEmpty(brands) && brands.map((item) => item.name).join(', ');
  };

  return (
    <div className={`${clsName} ${props.classWrap || ''}`}>
      <Row className={`${clsName}_container container`}>
        <Col md={6} xs={12} className={`${clsName}_container_left`}>
          <div className={`${clsName}_container_left_swiper`}>
            <Swipers
              className={`${clsName}_container_swiper`}
              spaceBetween={[100, 100, 100, 100]}
              slideTo={slideTo}
              setSlideTo={setSlideTo}
              data={(data.imagesFullPath || []).map((item, index) => (
                <img
                  key={index}
                  className={`${clsName}_container_left_swiper_img`}
                  src={item}
                />
              ))}
            />
          </div>
          <div className={`${clsName}_container_left_image`}>
            {(data.imagesFullPath || []).map((item, index) => (
              <div
                key={index}
                className={`${clsName}_container_left_image_list`}>
                <img
                  className={`${clsName}_container_left_image_list_img`}
                  src={item}
                  onClick={() => setSlideTo(index)}
                />
              </div>
            ))}
          </div>
        </Col>

        <Col md={6} xs={12} className={`${clsName}_container_right`}>
          <div className={`${clsName}_container_right_content`}>
            <p>{getProductBrands()}</p>
            <h1>{data.name}</h1>
            <p>{data.sku && <span>SKU: {data.sku}</span>}</p>
            <div>
              <span
                className={`${clsName}_container_right_content_public_price`}
                style={privatePrice ? {textDecoration: 'line-through'} : {}}>
                S${data.publicPrice}
              </span>
              <span
                className={`${clsName}_container_right_content_private_price`}>
                {privatePrice ? `S$${privatePrice}` : ''}
              </span>
            </div>
            {/* <div className={`${clsName}_container_right_content_boxColor`}>
              {(data.colors || []).map((item, index) => (
                <div
                  key={index}
                  className={`${clsName}_container_right_content_wrap_color ${
                    item.name == color ? 'active' : ''
                  }`}>
                  <img
                    key={index}
                    src={item.image}
                    width={40}
                    height={40}
                    className={`${clsName}_container_right_content_color`}
                    onClick={() => setColor(item.name)}
                  />
                </div>
              ))}
            </div> */}
            <span className={`${clsName}_container_right_content_title`}>
              DESCRIPTION:
            </span>
            <div
              className={`${clsName}_container_right_content_description ${
                showMore ? 'show-more' : ''
              }`}
              onClick={() => setShowMore(!showMore)}>
              {data.description}
            </div>
            <p>
              {data.size && (
                <span>
                  SIZE: <b>{data.size}</b>
                </span>
              )}
            </p>
            <span>
              COLOR: <b>{color}</b>
            </span>
            <div className={`${clsName}_container_right_content_boxColor`}>
              {isArray(productColors) &&
                productColors.map((item, index) => (
                  <div
                    key={index}
                    className={`${clsName}_container_right_content_wrap_color ${
                      item.name == color ? 'active' : ''
                    }`}>
                    <span
                      className={`${clsName}_container_right_content_wrap_color_item`}
                      onClick={() => setColor(item.name)}
                      style={{backgroundColor: item.key}}></span>
                  </div>
                ))}
            </div>

            {isQuickView && (
              <div
                className={`${clsName}_container_right_content_view_product`}>
                <a href={`/product/${data.shortCode}`} title={data.name}>
                  View product
                </a>
              </div>
            )}
            <div className={`${clsName}_container_right_content_quantity`}>
              <span>QUANTITY</span>
              <Input
                className={`${clsName}_container_right_content_quantity_input`}
                min={0}
                max={100}
                type="number"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {!isEmpty(me) && (
              <div className={`${clsName}_container_right_content_wishlist`}>
                <button
                  className={`${clsName}_container_right_content_wishlist_switch ${
                    isWishList ? 'active' : ''
                  }`}
                  onClick={onWishlistClick}>
                  {!isWishList && <HeartRegularIcon />}
                  {isWishList && <HeartSolidIcon />}
                  <div
                    className={`${clsName}_container_right_content_wishlist_switch_label`}>
                    Add to Wishlist
                  </div>
                </button>
              </div>
            )}
            <div className={`${clsName}_container_right_content_boxBtn`}>
              <div
                className={`${clsName}_container_right_content_boxBtn_add`}
                onClick={handleAddOrder}>
                <div style={{width: 16}}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <span
                  className={`${clsName}_container_right_content_boxBtn_add_span`}>
                  ADD TO CART
                </span>
              </div>
              <div className={isQuickView && 'hidden'}>
                <Row>
                  <Col style={{padding: '0 5px 0 15px'}}>
                    <div
                      className={`${clsName}_container_right_content_boxBtn_transparent`}
                      onClick={addToCompares}>
                      <span
                        className={`${clsName}_container_right_content_boxBtn_add_span`}>
                        {isCompare ? '-' : '+'} ADD TO COMPARES
                      </span>
                    </div>
                  </Col>
                  <Col style={{padding: '0 15px 0 5px'}}>
                    <div
                      onClick={() => setVisible(true)}
                      className={`${clsName}_container_right_content_boxBtn_transparent`}>
                      <div style={{width: 16}}>
                        <FontAwesomeIcon icon={faComment} />
                      </div>
                      <span
                        className={`${clsName}_container_right_content_boxBtn_add_span`}>
                        ENQUIRY US
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ModalEnquiryUs
        visible={visible}
        setVisible={() => setVisible(false)}
        id={data.id}
      />
    </div>
  );
};

PrductDetailInfo.propTypes = {
  data: PropTypes.object,
};

PrductDetailInfo.defaultProps = {
  data: {},
};

export default PrductDetailInfo;
