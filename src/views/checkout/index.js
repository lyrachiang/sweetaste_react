import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaRegCircle, FaCircle, FaCheckCircle } from 'react-icons/fa';

import Container from '../../components/container';
import { InfoBox } from '../../components/page';
import ShipForm from './ship_form';
import PaymentForm from './payment_form';
import TaxForm from './tax_form';
import styles from './checkout.module.scss';

import { getOrder } from '../../store/slice/order';
import { fetchProd, getProd } from '../../store/slice/prod';

const cx = classNames.bind(styles);

const Step = (props) => {
  const { step, total = 3 } = props;

  return (
    <div className={cx('step_box')}>
      {
        Array.from(Array(total).keys()).map((item, idx) => {
          return (
            <i key={idx}>
              {
                step === (idx + 1) ?
                  <FaCircle /> :
                  (
                    (idx + 1) < step ?
                      <FaCheckCircle /> :
                      <FaRegCircle />
                  )
              }
            </i>
          );
        })
      }
    </div>
  );
};

const CartItem = (props) => {
  const { imgUrl, name, price, count } = props;

  return (
    <div className={cx('prod_box')}>
      <div className={cx('prod_img')}>
        <div style={{backgroundImage: `url(${require(`../../assets/${imgUrl}`).default})`}}></div>
      </div>
      <div className={cx('prod_info')}>
        <div>
          <p>
            {name}
            <span>({count})</span>
          </p>
          <p>
            <strong>NT$ {price * count}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  let { params } = useRouteMatch({
    path: '/checkout/:type',
    strict: true,
    sensitive: true
  });

  const { type } = params;
  const dispatch = useDispatch();
  let history = useHistory();

  const { orderPrice, cartList, shipPrice }  = useSelector(getOrder);
  const { prodList }  = useSelector(getProd);

  useEffect(() => {
    dispatch(fetchProd());

    if (cartList.length === 0) {
      history.push('/');
    }
  }, []);

  return (
    <div className={cx('content_container')}>
      <Container>
        <div className={cx('checkout_container')}>
          <div>
            <div className={cx('gap')}>
              {type === 'ship' && (
                <ShipForm step={<Step step={1} />} />
              )}
              {type === 'payment' && (
                <PaymentForm step={<Step step={2} />} />
              )}
              {type === 'tax' && (
                <TaxForm step={<Step step={3} />} />
              )}
            </div>
          </div>
          <div>
            <div className={cx('gap')}>
              <div className={cx('order_block')}>
                <InfoBox title="訂單摘要">
                  <div className={cx('order_box')}>
                    <div>
                      <p>小計</p>
                      <p>NT$ {orderPrice}</p>
                    </div>
                    <div>
                      <p>運費</p>
                      <p>NT$ {orderPrice > 0 ? shipPrice : 0}</p>
                    </div>
                    <div>
                      <p>
                        <strong>總計</strong>
                      </p>
                      <p>
                        <strong>NT$ {orderPrice > 0 ? orderPrice + shipPrice : 0}</strong>
                      </p>
                    </div>
                  </div>
                </InfoBox>
                <InfoBox title="購物清單">
                  <div className={cx('cart_box')}>
                    {
                      cartList.map((item) => {
                        const { id, count } = item;

                        const itemData = prodList[id];

                        if (itemData) {
                          return (
                            <CartItem
                              key={itemData.id}
                              imgUrl={itemData.pic}
                              name={itemData.name}
                              price={itemData.price}
                              count={count}
                            />
                          );
                        }
                      })
                    }
                  </div>
                </InfoBox>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
