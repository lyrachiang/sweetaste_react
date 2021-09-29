import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaCheckCircle } from 'react-icons/fa';

import Banner from '../../components/banner';
import { Button } from '../../components/core';

import styles from './finish.module.scss';

import { getOrder, updateOrderStatus } from '../../store/slice/order';

const cx = classNames.bind(styles);

const Finish = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { orderStatus } = useSelector(getOrder);

  const atClick = useCallback(() => {
    dispatch(updateOrderStatus('init'));

    history.push('/');
  }, []);

  useEffect(() => {
    if (orderStatus !== 'finish') {
      history.push('/');
    }
  }, []);

  return (
    <>
      <Banner type="finish" className={cx('finish_banner')}>
        <div className={cx('finish_box')}>
          <div className={cx('finish_icon')}>
            {
              Array.from(Array(3).keys()).map((item, idx) => {
                return (
                  <i key={idx}>
                    <FaCheckCircle />
                  </i>
                );
              })
            }
          </div>
          <div className={cx('finish_img')}>
            <img src={require('../../assets/imgs/img_success.svg').default} alt="付款成功" />
          </div>
          <div>
            <Button
              type="secondary"
              block
              onClick={atClick}
            >
              繼續逛逛
            </Button>
          </div>
        </div>
      </Banner>
    </>
  );
};

export default Finish;
