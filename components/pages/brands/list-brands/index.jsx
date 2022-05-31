import {isArray} from 'validate.js';
import {Row, Col} from 'reactstrap';
import {getImagePath} from '~/helpers/common';

const ListBrands = (props) => {
  const brands = props?.data?.values?.value || [];

  return (
    <div className={`list-brands`}>
      <Row className={`m-0`}>
        {isArray(brands) &&
          brands.map((item, index) => (
            <Col key={index} md={4} xs={6} className={`list-brands_container`}>
              <div
                className={`list-brands_container_box shadow  p-4 bg-white rounded`}>
                <img
                  className={`list-brands_container_box_image`}
                  src={getImagePath(item.imageFullPath)}
                  alt={item.name}
                />
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ListBrands;
