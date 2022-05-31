import {Input} from 'reactstrap';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Loading from '~/components/public/loading';
import {deleteWishlist, getWishlistList} from '~/lib/services/wishlist';
import TableRow from './TableRow';
import pathRouter from '~/constants/path-router';
import {createCart} from '~/lib/services/cart';
import {setCache} from '~/lib/cache';

const WishlistPage = () => {
  const router = useRouter();
  const [loadding, setLoadding] = useState(false);
  const [checkIds, setCheckIds] = useState([]);
  const [data, setData] = useState([]);
  const getListIdAll = () => (data || []).map((item) => item._id);

  useEffect(() => {
    setLoadding(true);
    getWishlistList({meta: {pageSize: 100000}})
      .then((results) => {
        setData(results);
        setCheckIds((results || []).map((item) => item._id));
        setLoadding(false);
      })
      .catch(() => setLoadding(false));
  }, []);

  const onChangeCheck = (item) => {
    if (!!checkIds.find((checkId) => checkId == item._id)) {
      setCheckIds(checkIds.filter((checkId) => checkId != item._id));
      return;
    }
    setCheckIds([...checkIds, item._id]);
  };

  const setQuantity = (item, num) => {
    setData(
      data.map((product) => {
        if (product._id == item._id) {
          return {
            ...product,
            quantity: num,
          };
        }
        return product;
      }),
    );
  };

  const onCheckOut = () => {
    if (checkIds.length == 0) {
      return;
    }
    Promise.all(
      checkIds.map((checkId) => {
        const item = data.find((pro) => pro._id == checkId) || {};
        return createCart({
          productId: (item.product || {})._id,
          quantity: item.quantity || 1,
        });
      }),
    ).then((results) => {
      setCache(
        'ids_checkout',
        results.map((item) => (item.data || {})._id),
      );
      router.push(pathRouter.CHEKING_ORDER);
    });
  };

  const SubmitRemove = (item) => {
    setLoadding(true);
    deleteWishlist(item._id)
      .then(() => getWishlistList({meta: {pageSize: 100000}}))
      .then((results) => setData(results))
      .then(() => {
        if (!!checkIds.find((checkId) => checkId == item._id)) {
          setCheckIds(checkIds.filter((checkId) => checkId != item._id));
        }
      })
      .then(() => setLoadding(false))
      .catch(() => setLoadding(false));
  };

  const total = (checkIds || []).reduce((total, item) => {
    const product = data.find((pro) => pro._id == item) || {};
    const {publicPrice, membershipPrice} = product.product || {};
    let price =
      Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
        ? membershipPrice
        : publicPrice;
    return total + price * parseFloat(product.quantity || 1);
  }, 0);

  return (
    <div className={`wishlist-page`}>
      <Loading isLoading={loadding}>
        <div className={`wishlist-page_list`}>
          <div className="d-none d-lg-table product__row">
            <div className="d-lg-table-cell product__col col__title">
              <div className="cart_checkbox_custom">
                <label className="container_checkbox">
                  <Input
                    type="checkbox"
                    checked={checkIds.length == data.length}
                    onChange={() => setCheckIds(getListIdAll())}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="d-lg-table-cell product__col col__title">
              Product
            </div>
            <div className="d-lg-table-cell product__col col__title">Price</div>
            <div className="d-lg-table-cell product__col col__title">
              Quantity
            </div>
            <div className="d-lg-table-cell product__col col__title">Total</div>
          </div>
          {data.map((item, index) => (
            <TableRow
              key={index}
              {...(item.product || {})}
              quantity={item.quantity || 1}
              quantityProduct={(item.product || {}).quantity}
              moq={(item.product || {}).moq}
              id={item._id}
              setLoadding={setLoadding}
              onChangeCheck={() => onChangeCheck(item)}
              isCheck={!!checkIds.find((checkId) => checkId == item._id)}
              setQuantity={(num) => setQuantity(item, num)}
              SubmitRemove={() => SubmitRemove(item)}
            />
          ))}
        </div>

        <div className={`wishlist-page_checkout`}>
          <div
            onClick={onCheckOut}
            style={checkIds.length != 0 ? {cursor: 'pointer'} : {}}>
            Check out
          </div>
          <div>S${total.toFixed(2)}</div>
        </div>
      </Loading>
    </div>
  );
};

export default WishlistPage;
