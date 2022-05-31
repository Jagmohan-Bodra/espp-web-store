import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import openCartDetailsModal from '~/components/function-component/carts/cart-details-modal';
import {createCart} from '~/components/function-component/carts/common';

const MyCompares = (props) => {
  const {data, removeProduct} = props;
  let [showMore, setShowMore] = useState(false);

  const handleAddToCart = (id) => {
    createCart(id).then((carts) => {
      openCartDetailsModal(carts._id);
    });
  };
  return (
    <div className={`my-compares-container`}>
      <div className={`my-compares-container_header`}>
        <h2 className={`my-compares-container_header_title`}>
          <span style={{fontSize: 36}}>
            <strong>MY COMPARES</strong>
          </span>
        </h2>
      </div>
      <div className={`my-compares-container_table`}>
        <Row>
          <Col md={3} xs={4} className={`my-compares-container_table_title`}>
            <div className={`my-compares-container_table_title_photo`}>
              <span className={`my-compares-container_table_title_photo_span`}>
                <b>PRODUCT PHOTO</b>
              </span>
            </div>
            <div className={`my-compares-container_table_title_text color-row`}>
              <span>Price</span>
            </div>
            <div className={`my-compares-container_table_title_text`}>
              <span>Name</span>
            </div>
            <div className={`my-compares-container_table_title_text color-row`}>
              <span>Category</span>
            </div>
            <div className={`my-compares-container_table_title_text`}>
              <span>Type and Material</span>
            </div>
            <div className={`my-compares-container_table_title_text color-row`}>
              <span>Brand</span>
            </div>
            <div className={`my-compares-container_table_title_text`}>
              <span>Color</span>
            </div>
            <div
              className={`my-compares-container_table_title_text_description color-row`}>
              <span>Description</span>
            </div>
          </Col>
          <Col
            md={9}
            xs={8}
            className={`my-compares-container_table_product`}
            span={20}>
            <Row style={{flexWrap: 'nowrap'}}>
              {(data || [])
                .map((item, index) => (
                  <Col
                    className={`my-compares-container_table_product_container`}
                    md={4}
                    xs={6}
                    key={index}>
                    <div
                      className={`my-compares-container_table_product_photo`}>
                      <img
                        width="70%"
                        height="170px"
                        src={item.images[0] || ''}
                        className="img-fluid"
                      />
                      <div
                        className={`my-compares-container_table_product_photo_content`}>
                        <span>
                          <b>{item.name}</b>
                        </span>
                        <span
                          className={`my-compares-container_table_product_photo_content_description`}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    {/* <div
                      className={`my-compares-container_table_product_content color-row`}>
                      <span>
                        S$
                        {item.membershipPrice
                          ? item.membershipPrice
                          : item.publicPrice}
                      </span>
                    </div> */}
                    <div
                      className={`my-compares-container_table_product_content color-row`}>
                      <span
                        className={`my-compares-container_table_product_content_public_price`}
                        style={
                          item.membershipPrice
                            ? {textDecoration: 'line-through'}
                            : {}
                        }>
                        S${item.publicPrice}
                      </span>
                      <span
                        className={`my-compares-container_table_product_content_private_price`}>
                        {item.membershipPrice
                          ? `S$${item.membershipPrice}`
                          : ''}
                      </span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_content`}>
                      <span>{item.name}</span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_content color-row`}>
                      <span>
                        {(item.productCategories || [])
                          .map((item) => item.name)
                          .join(', ')}
                      </span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_content`}>
                      <span>{item.typeAndMaterial}</span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_content color-row`}>
                      <span>
                        {(item.brands || [])
                          .map((item) => item.name)
                          .join(', ')}
                      </span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_content`}>
                      <span>
                        {(item.colors || [])
                          .map((item) => item.name)
                          .join(', ')}
                      </span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_content_description color-row`}>
                      <span
                        className={`my-compares-container_table_product_content_description_span ${
                          showMore ? 'show-more' : ''
                        }`}
                        onClick={() => setShowMore(!showMore)}>
                        {item.description}
                      </span>
                    </div>
                    <div
                      className={`my-compares-container_table_product_box_button`}>
                      <div
                        className={`my-compares-container_table_product_box_button_add`}
                        onClick={() => handleAddToCart(item._id)}>
                        <div style={{width: 16}}>
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                        <span
                          className={`my-compares-container_table_product_box_button_add_span`}>
                          ADD TO CART
                        </span>
                      </div>
                      <div
                        onClick={() => removeProduct(item)}
                        className={`my-compares-container_table_product_box_button_remove`}>
                        <span>REMOVE</span>
                      </div>
                    </div>
                  </Col>
                ))
                .filter((item) => item)}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyCompares;
