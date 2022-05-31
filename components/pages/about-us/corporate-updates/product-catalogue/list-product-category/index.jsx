import {useRouter} from 'next/router';
import {Row, Col} from 'reactstrap';
import {isArray} from 'validate.js';
import pathRouter from '~/constants/path-router';
import {stringify} from '~/helpers/queryString';
import {checkImage} from '~/helpers/common';
const cssClass = 'list-product-category';

const ListProductCategory = (props) => {
  const router = useRouter();
  const data = props.data || [];

  const onViewProducts = (brandId) => {
    router.push({
      pathname: pathRouter.SHOP_PAGE,
      query: stringify({'brands._id': {objectId: brandId}}),
    });
  };

  return (
    <div className={`${cssClass}`}>
      <Row className={`${cssClass}_row`}>
        {isArray(data) &&
          data.map((item, index) => (
            <Col
              key={index}
              md={4}
              xs={6}
              className={`${cssClass}_col`}
              onClick={() => onViewProducts(item._id)}>
              <div className={`${cssClass}_col_box`}>
                <div
                  className={`${cssClass}_col_box_img`}
                  style={{
                    backgroundImage: `url(${checkImage(item.imagesFullPath)})`,
                  }}></div>
                <div className={`${cssClass}_col_box_text`}>
                  <p>{item.name}</p>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ListProductCategory;
