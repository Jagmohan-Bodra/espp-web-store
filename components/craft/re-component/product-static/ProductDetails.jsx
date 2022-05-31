import React, {useState} from 'react';
import {useRouter} from 'next/router';
import styles from './styles.module.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import {ButtonBlue, ButtonTransparent} from '../../../public/Button';
import {createCart} from '../../../function-component/carts/common';
import {useSelector} from 'react-redux';
import {openPublicModal} from '../../../modals/public-modal/common';
import CartDetails from '../../../function-component/carts/CartDetails';

const ProductDetails = () => {
  const data = useSelector((state) => state.product.obj);
  const router = useRouter();
  const [viewImage, setViewImage] = useState('');
  const handleAddOrder = () => {
    createCart(data._id).then((data) => {
      openPublicModal({
        header: 'Add to order',
        body: <CartDetails id={data._id} />,
        width: 1200,
        isNullFooter: true,
      });
    });
  };
  return (
    <div className="container">
      <button onClick={() => router.back()}>Back to Catalog</button>
      <div className={styles.contentMain}>
        <div className={styles.contentMainLeft}>
          <div className={styles.contentImage}>
            <img
              id="zomm-image"
              width="100%"
              height="300px"
              src={viewImage || ((data || {}).images || [])[0]}
            />
          </div>
          <div className={styles.contentSwiper}>
            <Swiper spaceBetween={20} slidesPerView={4}>
              {((data || {}).images || []).map((item, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => setViewImage(item)}
                  zoom={true}>
                  <img width={100} height={60} src={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.contentMainRight}>
          <h1>{(data || {}).name}</h1>
          <div>
            <p>
              <b>Product: </b>
              {((data || {}).productCategories || [])
                .map((item) => item.name)
                .join(', ')}
            </p>
            <p>
              <b>SKU: </b>
              {(data || {}).sku}
            </p>
            <p>
              <b>Brand: </b>
              {((data || {}).brands || []).map((item) => item.name).join(', ')}
            </p>
            <p>
              <b>Size: </b>
              {(data || {}).size}
            </p>
            <p>
              <b>Color: </b>
              {((data || {}).colors || []).map((item) => item.name).join(', ')}
            </p>
            <p>
              <b>UOM: </b>
              {(data || {}).uom}
            </p>
            <p>
              <b>Item Packing Size: </b>
              {(data || {}).itemPackingSize}
            </p>
            <p>
              <b>Qty Per Ctn: </b>
              {(data || {}).qtyPerCtn}
            </p>
            <p>
              <i>{(data || {}).description}</i>
            </p>
          </div>
          <div className={styles.btnAddCart}>
            <ButtonBlue
              text="ADD TO ORDER"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              }
              onClick={handleAddOrder}
            />
          </div>
          <div className={styles.bntFooter}>
            <ButtonTransparent
              text="ENQUIRY US"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chat-fill"
                  viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                </svg>
              }
            />
            <ButtonTransparent text="+ ADD TO COMPARE" />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.craft = {
  displayName: 'ProductDetails',
};

export default ProductDetails;
