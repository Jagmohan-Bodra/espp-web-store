import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderList} from '~/reduxs/order/action';
import moment from 'moment';
import {isEmpty} from 'validate.js';
import {checkImage} from '~/helpers/common';
import path from '~/constants/path-router';
const clsName = 'order-history_table';

const OrderHistoryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order.data);

  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  const onOrderView = (_id) => {
    router.push({
      pathname: path.PROFILE_ORDER_VIEW,
      query: {tradeOrderId: _id},
    });
  };

  return (
    <div className={`order-history`}>
      <div className={`order-history_header`}>
        <h2 className={`order-history_header_title`}>Recent Orders</h2>
      </div>
      <div className={`order-history_wrap_table`}>
        <table className={`${clsName} invoice`}>
          <thead className={`${clsName}_label`}>
            <tr>
              <th width="25%">
                <span className={`${clsName}_label_span p-2`}>Order No.</span>
              </th>
              <th width="15%">
                <span className={`${clsName}_label_span`}>Order date</span>
              </th>
              <th width="30%">
                <span className={`${clsName}_label_span`}>Product</span>
              </th>
              <th width="15%">
                <span className={`${clsName}_label_span`}>Total</span>
              </th>
              <th width="10%">
                <span className={`${clsName}_label_span`}>Status</span>
              </th>
              <th width="5%">
                <span className={`${clsName}_label_span p-2`}>Action</span>
              </th>
            </tr>
          </thead>
          <tbody className={`${clsName}_content`}>
            {(data || []).map((item, index) => (
              <tr
                key={index}
                className={`${clsName}_content_row`}
                onClick={() => onOrderView(item._id)}>
                <td className={`p-2 pt-4 pb-4`}>{item.orderNo}</td>
                <td>{moment(item.orderDateTime).format('DD/MM/YYYY')}</td>
                <td className={`pt-1 pb-1`}>
                  {getImages(item.orderProducts)}
                  {item.orderProducts.length > 3 &&
                    '+' + (item.orderProducts.length - 3)}
                </td>
                <td>S${item.total}</td>
                <td>
                  <Button
                    color="secondary"
                    size="md"
                    className={`${clsName}_content_row_btn-status`}
                    disabled>
                    {item.status}
                  </Button>
                </td>
                <td className={`itemCenter p-2 pt-3 pb-3`}>
                  <FontAwesomeIcon
                    className={`${clsName}_content_row_icon`}
                    color="#f5dcb0"
                    icon={faEye}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryPage;

const getImages = (orderProducts) => {
  const list = orderProducts || [];
  return (
    <>
      {list.map((item, index) => {
        if (index < 3) {
          const product = item.product || {};
          const src =
            product.images && !isEmpty(product.images[0]) && product.images[0];
          return (
            <img
              key={index}
              className={`${clsName}_content_row_image`}
              src={checkImage(src)}
            />
          );
        }
      })}
    </>
  );
};
