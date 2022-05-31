import {Button, Col, Divider, Empty, Row, Space, Statistic} from 'antd';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {CommentIcon} from '../../../lib/icons';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import {parse} from '../../../helpers/queryString';
import {getOrderDetail} from '../../../lib/services/order';
import {ORDERS_STATUS_OPTION} from './Orders';
import Link from 'next/link';
import PATH from '../../../constants/path-router';

const ProductItem = ({
  description,
  images,
  colors,
  brands,
  price,
  quantity,
}) => {
  return (
    <Row style={{marginBottom: '25px'}}>
      <Col span={2}>
        <img src={(images || [])[0]} width={50} height={50} />
      </Col>
      <Col span={12}>
        <div>{description}</div>
        <div className={styles.order_details_shop_body_item_sku}>
          Color: {(colors || []).map((item) => item.name).join(' ,')} <br />
          Brand: {(brands || []).map((item) => item.name).join(' ,')}
        </div>
      </Col>
      <Col span={4}>
        <Statistic
          value={price}
          suffix={`$`}
          valueStyle={{
            fontSize: '16px',
            // fontWeight: 'bold',
            // color: '#f57224',
            lineHeight: '1.3em',
          }}
        />
      </Col>
      <Col span={4}>Qty: {quantity || ''}</Col>
      {/* <Col span={6}>
        <a style={{ fontSize: '12px', color: '#021389' }}>WRITE A REVIEW</a>
      </Col> */}
    </Row>
  );
};

const OrderDetails = () => {
  const [data, setData] = useState({});
  const [isErr, setIsErr] = useState(false);
  const router = useRouter();
  const queryBuilder = parse(router.query) || {};
  const orderId = queryBuilder.uid;

  useEffect(() => {
    orderId &&
      getOrderDetail(orderId)
        .then((result) => setData(result))
        .catch(() => setIsErr(true));
  }, [orderId]);
  const {shippingAddress, orderProducts} = data || {};
  const {address, city, district, name, phone, type, wards} =
    shippingAddress || {};

  return (
    <div className={styles.order_details}>
      <div className={styles.order_details_header}>Order details</div>
      {(!orderId || isErr) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
          }}>
          <Empty description={`There are no order`}>
            <Link href={PATH.PRODUCT_LIST}>
              <Button type="primary">CONTINUE SHOPPING</Button>
            </Link>
          </Empty>
        </div>
      )}
      {!isErr && orderId && (
        <>
          <div className={styles.order_details_body}>
            <div className={styles.order_details_shop}>
              <div className={styles.order_details_shop_header}>
                <Row style={{justifyContent: 'space-between'}}>
                  <Col>
                    {/* <Space style={{height: '56px', cursor: 'pointer'}} size={5}>
                  <div>
                    <img
                      src="https://img.alicdn.com/imgextra/i1/O1CN01eZEDlJ24LnekqQ7eQ_!!6000000007375-2-tps-72-72.png"
                      className={styles.shop_left_info_logo}
                      data-spm-anchor-id="a2o4n.order_details.0.i13.518f705buJFgEI"
                    />
                  </div>
                  <div style={{fontSize: '15px', fontWeight: '700'}}>
                    Shop name
                  </div>
                </Space> */}

                    <Space
                      style={{
                        height: '56px',
                        marginLeft: '20px',
                        cursor: 'pointer',
                      }}
                      size={5}>
                      <div>
                        <CommentIcon
                          className={styles.shop_left_info_logo}
                          style={{color: '#049db7'}}
                        />
                      </div>
                      <div style={{color: '#049db7'}}>Chat now</div>
                    </Space>
                  </Col>
                  <Col>
                    <Space style={{height: '56px'}}>
                      <div className={styles.order_details_shop_status}>
                        {(
                          ORDERS_STATUS_OPTION.find(
                            (item) => item.key == data.status,
                          ) || {}
                        ).value || ''}
                      </div>
                    </Space>
                  </Col>
                </Row>
              </div>
              <Divider style={{margin: '0px'}} />
              <div className={styles.order_details_shop_body}>
                <div className={styles.order_details_shop_body_item}>
                  {/* <div className={styles.order_details_shop_body_track_package}>
                <Row style={{justifyContent: 'space-between'}}>
                  <Col style={{fontSize: '12px'}}>
                    <div>Delivered 16 Nov 2020 Standard Delivery</div>
                    <div>Leave your delivery feedback here!</div>
                    <div>Your package has been delivered Now.16 16:50</div>
                  </Col>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Button
                      className={
                        styles.order_details_shop_body_track_package_button
                      }>
                      Track Package
                    </Button>
                  </Col>
                </Row>
              </div> */}
                  {((data || {}).orderProducts || []).map((item, index) => (
                    <ProductItem
                      key={index}
                      description={(item.product || {}).description}
                      images={(item.product || {}).images}
                      colors={(item.product || {}).colors}
                      brands={(item.product || {}).brands}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.order_details_info}>
            <div className={styles.order_details_pull_left}>
              <p className={styles.order_number}>
                <Space>
                  <div>Order</div>
                  <div>{data.orderNo || ''}</div>
                </Space>
              </p>
              <p className={styles.order_text}>
                <div>
                  Book{' '}
                  {moment(data.orderDateTime).format('MMM DD, YYYY HH:mm:ss')}
                </div>
              </p>
            </div>
          </div>

          <div className={styles.order_details_info_bottom}>
            <Row>
              <Col span={12}>
                <div
                  className={styles.order_details_info}
                  style={{
                    marginRight: '10px',
                    marginBottom: '0px',
                    height: '100%',
                  }}>
                  <div style={{lineHeight: '2.4em'}}>{name || ''}</div>
                  <div>
                    <span className={styles.location__body_details}>
                      <span className={styles.address_tag_label}>
                        {type || ''}
                      </span>
                      {`${address || ''} ${wards || ''} ${district || ''} ${
                        city || ''
                      }`}
                    </span>
                  </div>
                  <div style={{lineHeight: '2.4em'}}>{phone || ''}</div>
                </div>
              </Col>
              <Col span={12}>
                <div
                  className={styles.order_details_info}
                  style={{marginBottom: '0px', height: '100%'}}>
                  <div> Total </div>
                  <Row style={{justifyContent: 'space-between'}}>
                    <Col>
                      {' '}
                      Total Money({(orderProducts || []).length} product)
                    </Col>
                    <Col>
                      <Statistic
                        value={data.grandTotal || ''}
                        suffix={`$`}
                        valueStyle={{
                          fontSize: '16px',
                          lineHeight: '2.4em',
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{justifyContent: 'space-between'}}>
                    <Col> Transport fee</Col>
                    <Col>
                      <Statistic
                        value={0}
                        suffix={`$`}
                        valueStyle={{
                          fontSize: '16px',
                          lineHeight: '2em',
                        }}
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <Row style={{justifyContent: 'space-between'}}>
                    <Col>total</Col>
                    <Col>
                      <Statistic
                        value={data.subTotal || ''}
                        suffix={`$`}
                        valueStyle={{
                          fontSize: '16px',
                          lineHeight: '2.4em',
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
