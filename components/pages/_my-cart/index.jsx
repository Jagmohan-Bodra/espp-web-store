import {Button, Row, Col} from 'reactstrap';
import Link from 'next/link';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import MyCartProductDetails from './MyCartProductDetails';
import MyCartOrderDetails from './MyCartOrderDetails';
import Loading from '~/components/public/loading';
import Empty from '~/components/public/empty';
import pathRouter from '../../../constants/path-router';

const MyCart = () => {
  const data = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);
  const [loadding, setLoadding] = useState(false);
  return (
    <div className={`my-cart-page`}>
      <Loading isLoading={loadding}>
        <div
          className={`container`}
          style={(data || []).length > 0 ? {} : {display: 'none'}}>
          <Row>
            <Col xl={8}>
              <div>
                {(data || []).map((item, index) => (
                  <span key={index}>
                    <MyCartProductDetails
                      {...(item.product || {})}
                      quantity={item.quantity}
                      quantityProduct={item.product.quantity}
                      id={item._id}
                      setLoadding={setLoadding}
                    />
                    <hr />
                  </span>
                ))}
              </div>
            </Col>
            <Col xl={4}>
              <MyCartOrderDetails data={data} me={me} />
            </Col>
          </Row>
        </div>
      </Loading>
      {(data || []).length < 1 && (
        <Empty description={`There are no products in the cart`}>
          <Link href={pathRouter.SHOP_PAGE}>
            <Button type="primary">CONTINUE SHOPPING</Button>
          </Link>
        </Empty>
      )}
    </div>
  );
};

export default MyCart;
