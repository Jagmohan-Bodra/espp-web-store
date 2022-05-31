//import {useEffect, useState} from 'react';
import {isArray} from 'validate.js';
import ProductCard from '~/components/public/CardProduct/ProductCard';
import {Swipers} from '~/components/public/swiper';

const BestSeller = (props) => {
  const products = props?.products || [];
  return (
    <div className={`home-best-seller`}>
      <div className={`home-best-seller_title`}>
        <h2>Best Sellers</h2>
      </div>
      <div className={`container`}>
        <Swipers
          className={`home-best-seller_swiper`}
          slidesPerView={[2, 2, 3, 3]}
          spaceBetween={[10, 50, 80, 80]}
          data={
            isArray(products) &&
            products.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))
          }
        />
      </div>
    </div>
  );
};

export default BestSeller;
