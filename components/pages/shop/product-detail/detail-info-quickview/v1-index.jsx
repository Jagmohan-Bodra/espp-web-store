// import React, {useEffect, useState} from 'react';
// import {Row, Col, Input} from 'reactstrap';
// import {Swipers} from '~/components/public/swiper';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
// import ModalEnquiryUs from '../modal-enquiry-us';
// import PropTypes from 'prop-types';
// import {createCart} from '~/components/function-component/carts/common';
// import {toggleRecentlyView} from '~/lib/cache';
// import {useRouter} from 'next/router';
// import {getProductDetailUrl} from '~/lib/services/product';
// import openCartDetailsModal from '~/components/function-component/carts/cart-details-modal';
// const clsName = 'product-detail-quick-view';

// const PrductDetailInfoQuickView = (props) => {
//   const router = useRouter();
//   const {id} = router.query;
//   const {data} = props;
//   const [visible, setVisible] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [color, setColor] = useState('');
//   const [showMore, setShowMore] = useState(false);
//   const [product, setProduct] = useState({});
//   const [slideTo, setSlideTo] = useState(0);

//   useEffect(() => {
//     setColor(((data.colors || {})[0] || {}).name || '');
//     //(id).then((result) => setProduct(result));
//     setProduct(data);
//     toggleRecentlyView({_id: data._id});
//   }, []);

//   const handleAddOrder = () => {
//     createCart(data._id, quantity).then((carts) => {
//       openCartDetailsModal(carts._id);
//       // ** TODO **
//       // show message sucess
//       // openPublicModal({
//       //   header: 'Add to order',
//       //   body: <CartDetails id={carts._id} />,
//       //   width: '1200px',
//       //   isNullFooter: true,
//       // });
//     });
//     props.closeModal && props.closeModal();
//   };

//   const privatePrice =
//     Number.parseFloat((product || {}).membershipPrice) <
//     Number.parseFloat((data || {}).publicPrice)
//       ? (product || {}).membershipPrice
//       : undefined;

//   return (
//     <div className={`${clsName} ${props.classWrap || ''}`}>
//       <Row className={`${clsName}_container container`}>
//         <Col md={6} xs={12} className={`${clsName}_container_left`}>
//           <div className={`${clsName}_container_left_swiper`}>
//             <Swipers
//               className={`${clsName}_container_swiper`}
//               spaceBetween={[100, 100, 100, 100]}
//               slideTo={slideTo}
//               setSlideTo={setSlideTo}
//               data={(data.imageFullPaths || []).map((item, index) => (
//                 <img
//                   key={index}
//                   className={`${clsName}_container_left_swiper_img`}
//                   src={item}
//                 />
//               ))}
//             />
//           </div>
//         </Col>

//         <Col md={6} xs={12} className={`${clsName}_container_right`}>
//           <div className={`${clsName}_container_right_content`}>
//             <h5>{data.name}</h5>
//             <p>{data.sku && <span>SKU: {data.sku}</span>}</p>
//             <div>
//               <span
//                 className={`${clsName}_container_right_content_public_price`}
//                 style={privatePrice ? {textDecoration: 'line-through'} : {}}>
//                 S${data.publicPrice}
//               </span>
//               <span
//                 className={`${clsName}_container_right_content_private_price`}>
//                 {privatePrice ? `S$${privatePrice}` : ''}
//               </span>
//             </div>
//             <div
//               className={`${clsName}_container_right_content_boxColor mt-2 mb-4`}>
//               {(data.colors || []).map((item, index) => (
//                 <div
//                   key={index}
//                   className={`${clsName}_container_right_content_wrap_color ${
//                     item.name == color ? 'active' : ''
//                   }`}>
//                   <img
//                     key={index}
//                     src={item.image}
//                     width={40}
//                     height={40}
//                     className={`${clsName}_container_right_content_color`}
//                     onClick={() => setColor(item.name)}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div
//               className={`${clsName}_container_right_content_description ${
//                 showMore ? 'show-more' : ''
//               }`}
//               onClick={() => setShowMore(!showMore)}>
//               {data.description}
//             </div>
//             <div
//               className={`${clsName}_container_right_content_view`}
//               onClick={() => setShowMore(!showMore)}>
//               <a href={`/product/${data.url}`} title={data.name}>
//                 View product
//               </a>
//             </div>
//             <div className={`${clsName}_container_right_content_quantity`}>
//               <span>QUANTITY</span>
//               <Input
//                 className={`${clsName}_container_right_content_quantity_input`}
//                 min={0}
//                 max={100}
//                 type="number"
//                 step="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//             </div>
//             <div className={`${clsName}_container_right_content_boxBtn`}>
//               <div
//                 className={`${clsName}_container_right_content_boxBtn_add`}
//                 onClick={handleAddOrder}>
//                 <div style={{width: 16}}>
//                   <FontAwesomeIcon icon={faShoppingCart} />
//                 </div>
//                 <span
//                   className={`${clsName}_container_right_content_boxBtn_add_span`}>
//                   ADD TO CART
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Col>
//       </Row>
//       <ModalEnquiryUs
//         visible={visible}
//         setVisible={() => setVisible(false)}
//         id={data._id}
//       />
//     </div>
//   );
// };

// PrductDetailInfoQuickView.propTypes = {
//   data: PropTypes.object,
// };

// PrductDetailInfoQuickView.defaultProps = {
//   data: {},
// };

// export default PrductDetailInfoQuickView;
