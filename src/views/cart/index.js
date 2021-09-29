import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaTrash } from 'react-icons/fa';

import Container from '../../components/container';
import { InputTool, Button } from '../../components/core';
import { InfoBox } from '../../components/page';
import styles from './cart.module.scss';

import { getOrder, removeCart, updateItemCount, updateOrderPrice } from '../../store/slice/order';
import { fetchProd, getProd } from '../../store/slice/prod';

const cx = classNames.bind(styles);

const CartItem = (props) => {
  const { id, imgUrl, name, price } = props;

  const dispatch = useDispatch();

  const [prodPrice, setProdPrice] = useState(price);

  const calculatePrice = useCallback((count) => {
    setProdPrice(() => price * count);

    dispatch(updateItemCount({id, count}));
  }, []);

  const atDeleteCartItem = useCallback((id) => {
    dispatch(removeCart(id));
  }, []);

  return (
    <div className={cx('prod_box')}>
      <div className={cx('prod_img')}>
        <div style={{backgroundImage: `url(${require(`../../assets/${imgUrl}`).default}`}}></div>
      </div>
      <div className={cx('prod_info')}>
        <div>
          <p>{name}</p>
          <p>NT$ {price}</p>
        </div>
        <div>
          <InputTool onNumberChange={calculatePrice}/>
        </div>
      </div>
      <div className={cx('prod_price')}>
        <p>NT$ {prodPrice}</p>
        <Button
          type="icon"
          className={cx('btn_delete')}
          onClick={() => {
            atDeleteCartItem(id);
          }}
        >
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  const [subTotal, setSubTotal] = useState(0);

  const { cartList, shipPrice }  = useSelector(getOrder);
  const { prodList }  = useSelector(getProd);

  useEffect(() => {
    dispatch(fetchProd());
  }, []);

  useEffect(() => {
    let total = 0;

    cartList.map((item) => {
      const itemData = prodList[item.id] ;

      if (itemData) {
        total += item.count * itemData.price;
      }
    });

    setSubTotal(() => total);

    dispatch(updateOrderPrice(total));
  }, [cartList, prodList]);

  return (
    <div className={cx('content_container')}>
      <Container>
        <div className={cx('cart_container')}>
          <div>
            <div className={cx('gap')}>
              <div className={cx('cart_block')}>
                <div>
                  <h3>您的購物車</h3>
                </div>
                <div>
                  {
                    cartList.map((item) => {
                      const { id } = item;

                      const itemData = prodList[id];

                      if (itemData) {
                        return (
                          <CartItem
                            key={itemData.id}
                            id={itemData.id}
                            imgUrl={itemData.pic}
                            name={itemData.name}
                            price={itemData.price}
                          />
                        );
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={cx('gap')}>
              <div className={cx('order_block')}>
                <InfoBox title="訂單摘要" theme="dark">
                  <div className={cx('order_box')}>
                    <div>
                      <p>小計</p>
                      <p>NT$ {subTotal}</p>
                    </div>
                    <div>
                      <p>運費</p>
                      <p>NT$ {subTotal > 0 ? shipPrice : 0}</p>
                    </div>
                    <div>
                      <p>
                        <strong>總計</strong>
                      </p>
                      <p>
                        <strong>NT$ {subTotal > 0 ? subTotal + shipPrice : 0}</strong>
                      </p>
                    </div>
                  </div>
                </InfoBox>
                <Button
                  type="secondary"
                  block
                  onClick={() => {
                    if (cartList.length === 0) {
                      alert('購物車內無商品唷');
                      return;
                    }

                    history.push('/checkout/ship');
                  }}
                >
                  結帳
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
