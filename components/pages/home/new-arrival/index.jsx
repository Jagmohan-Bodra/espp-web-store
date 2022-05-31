import Router from 'next/router';
import {Row, Col, Button} from 'reactstrap';
import {isArray} from 'validate.js';
import ProductCard from '~/components/public/CardProduct/ProductCard';
import {Swipers} from '~/components/public/swiper';
import pathRouter from '~/constants/path-router';
import {stringify} from '~/helpers/queryString';

const NewArrival = (props) => {
  const {data} = props;
  const [left] = data || [];
  const {value} = left || {};
  const sliderData = props?.sliderData?.values?.value || [];
  const products = props?.products || [];

  const handleShopMore = () => {
    Router.push({
      pathname: pathRouter.SHOP_PAGE,
      query: stringify({
        _id: {inObjectId: value || ['123456789012345678901234']},
      }),
    });
  };

  return (
    <div className={`home-new-arrival container-fluid`}>
      <Row className="row-reset-m">
        <Col md={6} xs={12} className={`home-new-arrival-col-left`}>
          <div className={`home-new-arrival-right`}>
            <Row className={`home-new-arrival-right_row`}>
              {isArray(products) &&
                products.map((item, index) => (
                  <Col
                    xs={6}
                    key={index}
                    className={`home-new-arrival-right_col`}>
                    <ProductCard item={item} />
                  </Col>
                ))}
            </Row>
            <div className={`home-new-arrival-right_sumbit`}>
              <Button
                className={`home-new-arrival-right_sumbit_btn`}
                onClick={handleShopMore}>
                SHOP MORE
              </Button>
            </div>
          </div>
        </Col>
        <Col md={6} xs={12} className={`home-new-arrival-col-right`}>
          <div className={`home-new-arrival-left`}>
            <Swipers
              className={`home-new-arrival-left_swiper`}
              navigation={false}
              pagination
              data={
                isArray(sliderData) &&
                sliderData.map((item, index) => (
                  <div
                    className={`home-new-arrival-left_swiper_item`}
                    key={index}>
                    <img
                      className={`home-new-arrival-left_swiper_item_image`}
                      width="100%"
                      src={item.imageFullPath}
                    />
                    <div className="home-new-arrival-left_swiper_item_content">
                      <div className="home-new-arrival-left_swiper_item_content_label">
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
      </Row>
    </div>
  );
};

export default NewArrival;
