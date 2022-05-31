import ProductCard from '~/components/public/CardProduct/ProductCard';
import {Swipers} from '~/components/public/swiper';

const ProductsSuggested = (props) => {
  const {title, data} = props;

  return (data || []).length > 0 ? (
    <div className={`products-suggested`}>
      <div className={`products-suggested_container container`}>
        <span className={`products-suggested_container_title`}>{title}</span>
        <div className={`products-suggested_container_swiper`}>
          <Swipers
            className={`home-best-seller_swiper`}
            slidesPerView={[2, 2, 4, 4]}
            spaceBetween={[10, 50, 80, 80]}
            data={(data || []).map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ProductsSuggested;
