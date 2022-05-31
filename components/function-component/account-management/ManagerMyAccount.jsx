import {Col, Row, Space} from 'antd';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {ORDERS_STATUS} from '../../../constants/master-data';
import Orders, {OrderGetList} from './Orders';
import styles from './styles.module.scss';

const ManagerMyAccount = () => {
  const [selected, setSelected] = useState(ORDERS_STATUS.PENDING);
  const me = useSelector((state) => state.me.data);
  const {customer} = me || {};
  const {addresses} = customer || {};
  const address = (addresses || [])[0] || {};
  return (
    <div className={styles.manager_account}>
      <div className={styles.order_details_header}>Manager My Account</div>
      <div className={styles.order_details_body}>
        <Row>
          <Col span={8}>
            <div
              className={styles.order_details_info}
              style={{marginRight: '10px', height: '100%'}}>
              <Space>
                <span>Person profile</span>
                <span style={{color: '#dadada'}}>|</span>
                <span>
                  <a href={'#'} style={{color: '#1a9cb7', fontSize: '12px'}}>
                    Edit
                  </a>
                </span>
              </Space>
              <div> {me.name} </div>
              <div> {me.email} </div>
              {/* <div> <Checkbox >Receive marketing email</Checkbox> </div> */}
            </div>
          </Col>
          <Col span={8}>
            <div
              className={styles.order_details_info}
              style={{marginRight: '5px', marginLeft: '5px', height: '100%'}}>
              <Space>
                <span>Address Book</span>
                <span style={{color: '#dadada'}}>|</span>
                <span>
                  <a href={'#'} style={{color: '#1a9cb7', fontSize: '12px'}}>
                    Edit
                  </a>
                </span>
              </Space>
              <div>Default shipping address</div>
              <div>{address.name || ''}</div>
              <div>{`${address.address || ''} ${address.wards || ''} ${
                address.district || ''
              } ${address.city || ''}`}</div>
              <div>{address.phone || ''} </div>
            </div>
          </Col>
          <Col span={8}>
            <div
              className={styles.order_details_info}
              style={{marginLeft: '10px', height: '100%'}}>
              <div></div>
              <div>Default billing address</div>
              <div>{address.name || ''}</div>
              <div>{`${address.address || ''} ${address.wards || ''} ${
                address.district || ''
              } ${address.city || ''}`}</div>
              <div>{address.phone || ''} </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div
            className={styles.order_details_info}
            style={{width: '100%', marginTop: '15px'}}>
            <Orders selected={selected} setSelected={setSelected} />
          </div>
        </Row>
        <Row>
          <OrderGetList status={selected} />
        </Row>
      </div>
    </div>
  );
};

export default ManagerMyAccount;
