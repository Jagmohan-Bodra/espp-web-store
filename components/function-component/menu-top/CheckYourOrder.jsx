import {Input, Space} from 'antd';
import moment from 'moment';
import Link from 'next/link';
import {ArrowRightIcon} from '../../../lib/icons';
import styles from './styles.module.scss';
import PATH from '../../../constants/path-router';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {openLoginModal} from '../../modals/login-modal/common';
import {useEffect, useState} from 'react';
import {getOrderDetailsByNo, getOrderList} from '../../../lib/services/order';

const CheckYourOrder = () => {
  const [data, setData] = useState([]);
  const [orderNo, setOrderNo] = useState('');
  const me = useSelector((state) => state.me.data);
  const router = useRouter();

  const handleOrderTrackClick = () => {
    if (me) {
      return getOrderDetailsByNo(orderNo).then((result) =>
        router.push(`${PATH.ORDER_CHECKING}&uid=${result._id}`),
      );
    }
    openLoginModal();
  };
  useEffect(() => {
    getOrderList({meta: {page: 1, pageSize: 3}}).then((result) =>
      setData(result.data),
    );
  }, []);

  return (
    <div className={styles.check_your_order_popup_content}>
      {me && (
        <div className={styles.check_your_order_my_order_show}>
          <div className={styles.check_your_order_track_title}>
            <div>Recent orders</div>
          </div>
          {(data || []).map((item, index) => (
            <p key={index} className={styles.check_your_order_last_order}>
              <Link href={`${PATH.ORDER_CHECKING}&uid=${item._id}`}>
                <span>
                  {moment(item.orderDateTime).format('DD/MM/YYYY')}- Order {` `}
                  {item.orderNo || ''}
                </span>
              </Link>
            </p>
          ))}
        </div>
      )}
      <div className={styles.check_your_order_track_title}>Check my order</div>

      <label className={styles.check_your_order_top_input_label}>
        Please enter order number:
      </label>
      <div className={styles.check_your_order_track_order_input_wrap}>
        <Space size={0}>
          <Input
            placeholder="eg.123456789"
            className={styles.check_your_order_order_text}
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
          />
          <button
            type="button"
            className={styles.check_your_order_top_button}
            onClick={handleOrderTrackClick}>
            <ArrowRightIcon style={{color: 'white'}} />
          </button>
        </Space>
      </div>
      {/* <p className={styles.check_your_order_track_order_more_text}>
        If you have any other questions,
        <a href="#" title="If you have any other questions, ">
          Click here
        </a>
      </p> */}
    </div>
  );
};

export default CheckYourOrder;
