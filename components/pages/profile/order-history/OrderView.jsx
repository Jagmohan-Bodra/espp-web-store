import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Row, Col, Button} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'validate.js';
import {getOrdersDetail} from '~/reduxs/order/action';
import {updateOrderStatusService} from '~/lib/services/order';
import {notif} from '~/components/public/notification/common';
import {checkImage} from '~/helpers/common';
import {formatDateTimeDefault} from '~/helpers/date';
import {ORDERS_STATUS} from 'constants/master-data';
const clsName = 'order-history-view_table';

const OrderHistoryPage = () => {
  const router = useRouter();
  const {tradeOrderId} = router.query;
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.obj);

  useEffect(() => {
    if (!isEmpty(tradeOrderId)) {
      dispatch(getOrdersDetail(tradeOrderId));
    }
  }, [tradeOrderId]);

  const orderConfirm = () => {
    updateOrderStatusService(order._id, ORDERS_STATUS.COMPLETED).then(() => {
      notif({message: 'Confirmed success'});
      dispatch(getOrdersDetail(tradeOrderId));
    });
  };

  let numberItems = 0;
  const orderProducts = order.orderProducts || [];
  const customer = order.customer || {};
  const user = (customer && customer.user) || {};
  const totalResult = order.subTotal + (order.shippingFee || 0);

  return (
    <div className={`order-history-view`}>
      <div className={`order-history-view_header`}>
        <h2 className={`order-history-view_header_title`}>Order Details</h2>
      </div>
      <div>
        <Row>
          <Col>
            <div>
              <span className={`order-history-view_order`}>
                Order {order.orderNo}
              </span>
              <br />
              <span className={`order-history-view_placed`}>
                {!isEmpty(order.orderDateTime) &&
                  'Placed on ' + formatDateTimeDefault(order.orderDateTime)}
              </span>
            </div>
          </Col>
          <Col className="text-right">
            <Button
              color="secondary"
              size="md"
              className={`order-history-view_btn-status`}
              disabled>
              {order.status}
            </Button>
            <br />
            {(order.status == ORDERS_STATUS.PENDING ||
              order.status == ORDERS_STATUS.PROCESSING ||
              order.status == ORDERS_STATUS.READY_TO_SHIP) && (
              <Button color="link" className="p-0 mt-2" onClick={orderConfirm}>
                I have received the order.
              </Button>
            )}
          </Col>
        </Row>

        <table className={`${clsName} invoice`}>
          <thead className={`${clsName}`}>
            <tr>
              <th width="15%"></th>
              <th width="35%"></th>
              <th width="20%"></th>
              <th width="15%"></th>
              <th width="15%"></th>
            </tr>
          </thead>
          <tbody className={`${clsName}_content`}>
            {orderProducts.map((orderProduct, index) => {
              numberItems += orderProduct.quantity;
              return getProductRow(orderProduct, index);
            })}
          </tbody>
        </table>
        <Row className="mt-5">
          <Col sm="12" md="6" className="mb-5">
            <div>
              <strong className={`order-history-view_customer`}>
                {user.firstName} {user.lastName}
              </strong>
              <br />
              <span className={`order-history-view_address`}>
                {customer.addressUnitNo +
                  ', ' +
                  customer.addressStresstName +
                  ', ' +
                  customer.addressBuildingName +
                  ', ' +
                  customer.addressStresstName +
                  ', ' +
                  customer.addressCity +
                  ', ' +
                  customer.addressCountry +
                  ', ' +
                  customer.addressPostCode}
              </span>
            </div>
          </Col>
          <Col sm="12" md="6">
            <div>
              <strong className={`order-history-view_customer`}>
                Total Summary
              </strong>
              <br />
              <div className="pt-3">
                <table className={`order-history-view_total w-100`}>
                  <tbody>
                    <tr>
                      <td className="pb-3">Subtotal ({numberItems} item)</td>
                      <td className="text-right">
                        <b>S${order.subTotal && order.subTotal.toFixed(2)}</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3">Shipping Fee</td>
                      <td className="text-right">
                        S${order.shippingFee && order.shippingFee.toFixed(2)}
                      </td>
                    </tr>
                    <tr className={`order-history-view_tr_total`}>
                      <td className="pb-3 pt-3">
                        <b>Total (Including VAT)</b>
                      </td>
                      <td className="text-right order-history-view_tr_total_number">
                        S${totalResult.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className={`order-history-view_menthod_payment`}>
                  Paid by Cash on Delivery
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderHistoryPage;

const getProductRow = (orderProduct, key) => {
  const product = orderProduct.product || {};
  const quantity = orderProduct.quantity || 0;
  const price = orderProduct.price || 0;
  const {name, membershipPrice, images, colors} = product || {};
  const src = images && !isEmpty(images[0]) && images[0];

  const privatePrice =
    Number.parseFloat(membershipPrice) < Number.parseFloat(price)
      ? membershipPrice
      : undefined;
  const total = parseFloat(privatePrice || price) * quantity;

  return (
    <tr key={key} className={`${clsName}_content_row`}>
      <td className={`p-2 pt-4 pb-4`}>
        <img className={`${clsName}_content_row_image`} src={checkImage(src)} />
      </td>
      <td>
        <strong>{name}</strong>
        <br />
        <span>
          Colors: {(colors || []).map((item) => item.name).join(' ,')}
        </span>
      </td>
      <td className="text-center">
        <span
          className={'price_public'}
          style={privatePrice ? {textDecoration: 'line-through'} : {}}>
          S${price}
        </span>
        <span className={'price_private'}>
          {privatePrice ? `S$${privatePrice}` : ''}
        </span>
      </td>
      <td className="text-center">Qty: {quantity}</td>
      <td className="text-right">S${total.toFixed(2)}</td>
    </tr>
  );
};
