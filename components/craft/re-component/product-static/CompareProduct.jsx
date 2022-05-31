import React, {useState} from 'react';
import {Row, Col} from 'antd';
import styles from './styles.module.scss';
import {getAllValueStorage} from '../../../../helpers/common';
import {ButtonBlue, ButtonTransparent} from '../../../public/Button';
import {CancelIcon, CartIcon} from '../../../../lib/icons';
import {isEmpty} from 'validate.js';

const CompareProduct = () => {
  const [data, setData] = useState(getAllValueStorage());
  const onRemovePrduct = (id) => {
    localStorage.removeItem(id);
    setData(getAllValueStorage());
  };

  return (
    <div className={`container empty-component craft-block`}>
      <h1>MY COMPARES</h1>
      <div className={styles.tableCompares}>
        <Row styles={{width: '100%'}}>
          <Col className={styles.colTitle} span={4}>
            <div className={styles.rowEmpty}></div>
            <div className={styles.rowOverview}>
              <span>Product Overview</span>
            </div>
            <div className={styles.rowTitle}>
              <span>Name</span>
            </div>
            <div className={styles.rowTitle}>
              <span>Category</span>
            </div>
            <div className={styles.rowTitle}>
              <span>Type and Material</span>
            </div>
            <div className={styles.rowTitle}>
              <span>Brand</span>
            </div>
            <div className={styles.rowTitle}>
              <span>Color</span>
            </div>
            <div className={styles.rowTitle}>
              <span>Description</span>
            </div>
          </Col>
          <Col className={styles.colProduct} span={20}>
            <Row style={{flexWrap: 'nowrap'}}>
              {data
                .map(
                  (item, index) =>
                    !isEmpty(item._id) && (
                      <Col span={6} key={index}>
                        <div className={styles.rowProduct}>
                          <ButtonTransparent
                            stylescustum={styles.btnRemove}
                            onClick={() => onRemovePrduct(item._id)}
                            icon={<CancelIcon />}
                          />
                        </div>
                        <div className={styles.rowOverviewProduct}>
                          <div className={styles.boxImage}>
                            <img src={(item.images || [])[0] || ''} />
                          </div>
                          <ButtonBlue
                            stylescustum={styles.btnOrder}
                            text="ORDER"
                            icon={<CartIcon />}
                          />
                          <ButtonTransparent
                            stylescustum={styles.btnDetail}
                            text="GO TO PRODUCT DETAILS"
                          />
                        </div>
                        <div className={styles.rowProduct}>
                          <span>{item.name}</span>
                        </div>
                        <div className={styles.rowProduct}>
                          <span>
                            {(item.productCategories || [])
                              .map((item) => item.name)
                              .join(', ')}
                          </span>
                        </div>
                        <div className={styles.rowProduct}>
                          <span></span>
                        </div>
                        <div className={styles.rowProduct}>
                          <span>
                            {(item.brands || [])
                              .map((item) => item.name)
                              .join(', ')}
                          </span>
                        </div>
                        <div className={styles.rowProduct}>
                          <span>
                            {(item.colors || [])
                              .map((item) => item.name)
                              .join(', ')}
                          </span>
                        </div>
                        <div className={styles.rowProduct}>
                          <span>{item.description}</span>
                        </div>
                      </Col>
                    ),
                )
                .filter((item) => item)}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

CompareProduct.craft = {
  displayName: 'CompareProduct',
};

export default CompareProduct;
