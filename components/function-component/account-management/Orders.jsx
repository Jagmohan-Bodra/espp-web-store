import {Col, Divider, Empty, Row} from 'antd';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {ORDERS_STATUS_OPTION} from '../../../constants/master-data';
import {getOrderList} from '../../../lib/services/order';
import PATH from '../../../constants/path-router';
import styles from './styles.module.scss';
import PaganitionBlock from '../../public/Pagination';
import {getPageFilter} from '../../../helpers/queryString';

const TimeLineComponent = (props) => {
  const [selected, setSelected] = useState('');
  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  return (
    <div className={styles.order_list_tabs}>
      {ORDERS_STATUS_OPTION.map((item, index) => (
        <span
          key={index}
          className={`${styles.order_tab_item} ${
            selected == item.key && styles.order_tab_item_active
          }`}
          onClick={() => {
            setSelected(item.key);
            props.setSelected(item.key);
          }}>
          {item.value}
        </span>
      ))}
    </div>
  );
};

const Orders = (props) => {
  return (
    <div className={styles.orders}>
      <TimeLineComponent {...props} />
    </div>
  );
};

const OrdersItem = (props) => {
  const {data} = props;
  const {images, description, colors, brands, quantity, price} = data || {};

  return (
    <div className={styles.order_item}>
      <div className={styles.order_details_shop_body}>
        <div className={styles.order_details_shop_body_item}>
          <Row>
            <Col span={2}>
              <img src={(images || [])[0]} width={50} height={50} />
            </Col>
            <Col span={10}>
              <div>{description || ''}</div>
              <div className={styles.order_details_shop_body_item_sku}>
                Color: {(colors || []).map((item) => item.name).join(' ,')}
                <br />
                Brand: {(brands || []).map((item) => item.name).join(' ,')}
              </div>
            </Col>
            <Col span={4}>$ {price || ''}</Col>
            <Col span={4}>Qty: {quantity || 0}</Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export const OrderGetList = (props) => {
  const {status} = props;
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [filter, setFilter] = useState({});
  const router = useRouter();

  useEffect(() => {
    onChangeFilter({
      status: {equal: status},
      ...getPageFilter(1),
    });
  }, [status]);

  const onChangeFilter = (value) => {
    const params = {
      ...filter,
      ...value,
      meta: {
        ...(filter.meta || {}),
        ...(value.meta || {}),
      },
    };
    setFilter(params);
    return getOrderList(params).then((result) => {
      setData(result.data);
      setMeta(result.meta);
    });
  };

  const onPageChange = (page) => {
    onChangeFilter({
      ...getPageFilter(page),
    });
  };

  return (
    <div className={styles.order_get_list}>
      {(data || []).map((item, index) => (
        <div
          key={index}
          className={styles.order_details_info}
          style={{width: '100%', marginTop: '15px', cursor: 'pointer'}}
          onClick={() => router.push(`${PATH.ORDER_CHECKING}&uid=${item._id}`)}>
          <div
            className={styles.order_details_shop_header}
            style={{height: 'auto'}}>
            <Row style={{justifyContent: 'space-between'}}>
              <Col>Order Code: {item.orderNo || ''}</Col>
              <Col>
                {' '}
                <span>
                  {' '}
                  {(
                    ORDERS_STATUS_OPTION.find(
                      (option) => option.key == item.status,
                    ) || {}
                  ).value || ''}
                </span>
              </Col>
            </Row>
          </div>
          <Divider style={{margin: '0px'}} />
          {item.orderProducts.map((productItem, productIndex) => (
            <OrdersItem
              key={productIndex}
              data={{
                images: (productItem.product || {}).images,
                description: (productItem.product || {}).description,
                colors: (productItem.product || {}).colors,
                brands: (productItem.product || {}).brands,
                quantity: productItem.quantity,
                price: productItem.price,
              }}
            />
          ))}
        </div>
      ))}
      {(data || []).length > 0 && (
        <PaganitionBlock
          pageSize={parseInt(((meta || {}).paginate || {}).pageSize)}
          current={
            ((meta || {}).paginate || {}).page
              ? parseInt(((meta || {}).paginate || {}).page)
              : 1
          }
          total={((meta || {}).paginate || {}).total}
          onChange={onPageChange}
        />
      )}
      {(data || []).length == 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}>
          <Empty description={`There are no order`}></Empty>
        </div>
      )}
    </div>
  );
};

export default Orders;
