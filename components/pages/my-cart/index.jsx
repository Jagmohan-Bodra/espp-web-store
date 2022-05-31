import {Input} from 'reactstrap';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {isEmpty} from 'validate.js';
import {Alert} from 'reactstrap';
import Loading from '~/components/public/loading';
import MyCartProductDetails from './MyCartDetails';
import {getSettingList} from '~/reduxs/setting/action';
import {getPageFilter} from '~/helpers/queryString';
import pathRouter from '~/constants/path-router';
import {setCache} from '~/lib/cache';
import {debounce} from '~/helpers/common';
import {SETTING_KEY} from '~/constants/master-data';

const MyCart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.data);
  const settings = useSelector((state) => state.setting.data);
  const [loadding, setLoadding] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(true);
  const [checkIds, setCheckIds] = useState([]);
  const [idsErrors, setIdsErrors] = useState([]);
  const [visibleErrTotal, setVisibleErrTotal] = useState(false);
  const router = useRouter();

  const onDismiss = () => setVisibleErrTotal(false);

  useEffect(() => {
    let queryListAll = getPageFilter(1, true);
    dispatch(getSettingList(queryListAll));
  }, []);

  const getListIdAll = () => {
    let list = [];
    (data || []).map((item) => {
      list.push(item._id);
    });
    return list;
  };

  useEffect(() => {
    if (!isEmpty(data) && isEmpty(checkIds)) {
      setCheckIds(getListIdAll());
    }
  }, [data]);

  const onCheckAll = (e) => {
    let val = e.target.checked;
    setIsCheckAll(val);
    if (val) {
      setCheckIds(getListIdAll());
    } else {
      setCheckIds([]);
    }
  };

  const onCheckProduct = (isCheck, _id) => {
    let ids = checkIds;
    if (isCheck && !ids.includes(_id)) {
      ids.push(_id);
    }
    if (!isCheck) {
      ids = ids.filter((item) => item !== _id);
    }
    setCheckIds(ids);
    setLoadding(true);
    clearLoading();
  };

  const onCheckIsError = (isError, _id) => {
    let ids = idsErrors;
    if (isError && !ids.includes(_id)) {
      ids.push(_id);
    }
    if (!isError) {
      ids = ids.filter((item) => item !== _id);
    }
    setIdsErrors(ids);
  };

  const clearLoading = debounce(() => {
    setLoadding(false);
  }, 250);

  const dataChecked = data.filter((item) => checkIds.includes(item._id));

  const total = (dataChecked || []).reduce((total, item) => {
    const {publicPrice, membershipPrice} = item.product || {};
    let price =
      Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
        ? membershipPrice
        : publicPrice;
    if (!checkIds.includes(item._id)) {
      price = 0;
    }
    return total + price * parseFloat(item.quantity);
  }, 0);

  const minValue = (
    (settings || []).find(
      (item) => item.key == SETTING_KEY.MINIMUM_DELIVERY_VALUE,
    ) || {}
  ).value;

  const checkDeliveryValue = () => {
    if (total >= parseFloat(minValue)) {
      return true;
    }
    return false;
  };

  const onCheckOut = () => {
    if (!checkDeliveryValue()) {
      setVisibleErrTotal(true);
      return;
    }
    setCache('ids_checkout', checkIds);
    router.push(pathRouter.CHEKING_ORDER);
  };

  const isDisabledCheckout = () => {
    if (isEmpty(checkIds)) {
      return true;
    }
    let checkedIdsHasError = checkIds.filter((_id) => idsErrors.includes(_id));
    if (!isEmpty(checkedIdsHasError)) {
      return true;
    }
    return false;
  };

  return (
    <div className={`page-my-cart`}>
      <div className={`page-my-cart_header`}>CART</div>
      <div className={`page-my-cart_body container`}>
        <Loading isLoading={loadding}>
          <div className={`page-my-cart_body_product_list`}>
            <div className="d-none d-lg-table product__row">
              <div className="d-lg-table-cell product__col col__title">
                <div className="cart_checkbox_custom">
                  <label className="container_checkbox">
                    <Input
                      type="checkbox"
                      checked={isCheckAll}
                      onChange={onCheckAll}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="d-lg-table-cell product__col col__title">
                Product
              </div>
              <div className="d-lg-table-cell product__col col__title">
                Price
              </div>
              <div className="d-lg-table-cell product__col col__title">
                Quantity
              </div>
              <div className="d-lg-table-cell product__col col__title">
                Total
              </div>
            </div>
            {data.map((item, index) => (
              <MyCartProductDetails
                key={index}
                {...(item.product || {})}
                quantity={item.quantity}
                quantityProduct={item.product.quantity}
                moq={item.product.moq}
                id={item._id}
                setLoadding={setLoadding}
                onCheckProduct={onCheckProduct}
                isCheckAll={isCheckAll}
                checkIsError={onCheckIsError}
              />
            ))}
          </div>
          <div className={`page-my-cart_body_summer`}>
            <div className={`page-my-cart_body_summer_left`}>
              <Alert
                color="danger"
                isOpen={visibleErrTotal}
                toggle={onDismiss}
                fade={false}>
                Delivery value must be greater than ${minValue}
              </Alert>
            </div>
            <div className={`page-my-cart_body_summer_right`}>
              <div className={`page-my-cart_body_summer_right_total`}>
                S${total.toFixed(2)}
              </div>
              <div className={`page-my-cart_body_summer_right_tip`}>
                Shipping calculated at checkout
              </div>
              <button
                className={`page-my-cart_body_summer_right_submit`}
                onClick={onCheckOut}
                disabled={isDisabledCheckout()}>
                CHECK OUT
              </button>
            </div>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default MyCart;
