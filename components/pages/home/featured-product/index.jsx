import Router from 'next/router';
// import {useEffect, useState} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {isArray} from 'validate.js';
import ProductCard from '~/components/public/CardProduct/ProductCard';
import {Swipers} from '~/components/public/swiper';
import pathRouter from '~/constants/path-router';
import {stringify} from '~/helpers/queryString';

const FeaturedProduct = (props) => {
  const {data} = props;
  const [right] = data || [];
  const {value} = right || {};
  //const [productList, setProductList] = useState([]);

  const sliderData = props?.sliderData?.values?.value || [];
  const products = props?.products || [];
  //const productData = props?.productData?.values?.value || [];

  // useEffect(() => {
  //   getProductList({
  //     _id: {inObjectId: value || ['123456789012345678901234']},
  //     meta: {
  //       page: 1,
  //       pageSize: 10000,
  //     },
  //   }).then((results) => {
  //     const newData = (value || [])
  //       .map((item) =>
  //         ((results || {}).data || []).find((product) => product._id == item),
  //       )
  //       .filter((item) => item)
  //       .splice(0, 4);
  //     setProductList(newData);
  //   });
  // }, []);

  const handleShopMore = () => {
    Router.push({
      pathname: pathRouter.SHOP_PAGE,
      query: stringify({
        _id: {inObjectId: value || ['123456789012345678901234']},
      }),
    });
  };

  return (
    <div className={`home-featured-product`}>
      <Row className={`home-featured-product-row`}>
        <Col md={6} xs={12} className={`home-featured-product-col-right`}>
          <div className={`home-featured-product-left`}>
            <Swipers
              className={`home-featured-product-left_swiper`}
              navigation={false}
              pagination
              data={
                isArray(sliderData) &&
                sliderData.map((item, index) => (
                  <div
                    className={`home-featured-product-left_swiper_item`}
                    key={index}>
                    <img
                      className={`home-featured-product-left_swiper_item_image`}
                      width="100%"
                      src={item.imageFullPath}
                    />
                    <div className="home-featured-product-left_swiper_item_content">
                      <div className="home-featured-product-left_swiper_item_content_label">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}></div>
                      </div>
                    </div>
                  </div>
                ))
              }
            />
          </div>
        </Col>
        <Col md={6} xs={12} className={`home-featured-product-col-right`}>
          <div className={`home-featured-product-right container`}>
            <Row className={`home-featured-product-right_row`}>
              {isArray(products) &&
                products.map((item, index) => (
                  <Col
                    xs={6}
                    key={index}
                    className={`home-featured-product-right_col`}>
                    <ProductCard item={item} />
                  </Col>
                ))}
            </Row>
            <div className={`home-featured-product-right_sumbit`}>
              <Button
                className={`home-featured-product-right_sumbit_btn`}
                onClick={handleShopMore}>
                SHOP MORE
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturedProduct;
