import React, {useState} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import {createCart} from '../../function-component/carts/common';
import {openPublicModal} from '../../modals/public-modal/common';
import CartDetails from '../../function-component/carts/CartDetails';
import {stringify} from '../../../helpers/queryString';
import {Button} from 'antd';

const CardProduct = (props) => {
  const {data, name, image, url, id, checkCompares} = props;
  const [selectCompares, setSelectCompares] = useState(checkCompares);
  const handleOrder = () => {
    createCart(id).then((data) => {
      openPublicModal({
        header: 'Add to order',
        body: <CartDetails id={data._id} />,
        width: 1200,
        isNullFooter: true,
      });
    });
  };

  const addToCompares = () => {
    if (selectCompares) {
      localStorage.removeItem(id);
      setSelectCompares(false);
      return;
    }
    localStorage.setItem(id, stringify(data));
    setSelectCompares(true);
  };

  return (
    <div className={styles.cardProductMain}>
      <Link href={`/product/${url}`}>
        <div className={styles.cardProductImage}>
          <img
            className={styles.image}
            width="100%"
            height="250px"
            src={image}
          />
          <div className={styles.middle}>
            <div className={styles.text}>
              <span>MORE DETAIL</span>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.cardBoxButton}>
        <Button onClick={addToCompares} className={styles.cardButton}>
          <span className={styles.iconAdd}>{selectCompares ? '-' : '+'}</span>
          <span className={styles.textAdd}>COMPARE</span>
        </Button>
        <Button className={styles.cardButton} onClick={handleOrder}>
          <span className={styles.iconAdd}>+</span>
          <span className={styles.textAdd}>ORDER</span>
        </Button>
      </div>
      <div className={styles.cardTitleBottomMain}>
        <Link href={`/product/${url}`}>
          <span className={styles.cardTitleBottom}>{name}</span>
        </Link>
      </div>
    </div>
  );
};

export const Card = (props) => {
  const {name, image, onClick} = props;
  return (
    <div className={styles.cardMain} onClick={onClick && onClick}>
      <div className={styles.cardImage}>
        <img width="100%" height="100%" src={image} />
      </div>
      <div className={styles.cardTitleBottomMain}>
        <span className={styles.cardTitleBottom}>{name}</span>
      </div>
    </div>
  );
};

export const CardProductView = (props) => {
  const {name, image, description, publicPrice, privatePrice} = props;
  return (
    <div className={styles.cardViewMain}>
      <div className={styles.cardViewImg}>
        <img width="100%" height="auto" src={image} />
        <div className={styles.middleView}>
          <div className={styles.textView}>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
      <div>
        <span>
          <b>{name}</b>
        </span>
        <br />
        <span>{description}</span>
        <br />
        <span
          className={styles.publicPrice}
          style={privatePrice ? {textDecoration: 'line-through'} : {}}>
          <b>{publicPrice}</b>
        </span>
        <span className={styles.privatePrice}>
          <b>{privatePrice}</b>
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
