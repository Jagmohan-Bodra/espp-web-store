import {useRouter} from 'next/router';
import {isArray} from 'validate.js';
import {Swipers} from '~/components/public/swiper';
import pathRouter from '~/constants/path-router';
import {stringify} from '~/helpers/queryString';

const OurBrandPartner = (props) => {
  const router = useRouter();
  const brands = props?.data?.values?.value || [];

  const onViewProducts = (brandId) => {
    router.push({
      pathname: pathRouter.SHOP_PAGE,
      query: stringify({'brands.id': {objectId: brandId}}),
    });
  };

  return (
    <div className={`home-our-brand-partner`}>
      <div className={`home-our-brand-partner_title`}>
        <h2>Our Brand Partners</h2>
      </div>
      <div className={`container`}>
        <Swipers
          className={`home-our-brand-partner_swiper`}
          slidesPerView={[3, 3, 5, 5]}
          spaceBetween={[10, 20, 80, 80]}
          data={
            isArray(brands) &&
            brands.map((item, index) => (
              <div
                className={`home-our-brand-partner_swiper_block`}
                key={index}
                onClick={() => onViewProducts(item.id)}>
                <img
                  src={item.imageFullPath}
                  alt={item.name}
                  key={index}
                  className={`home-our-brand-partner_swiper_block_img`}
                />
              </div>
            ))
          }
        />
      </div>
    </div>
  );
};

export default OurBrandPartner;
