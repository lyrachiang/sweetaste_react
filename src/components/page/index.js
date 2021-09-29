import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { Button } from '../../components/core';
import styles from './page.module.scss';

import { getUser } from '../../store/slice/user';
import { addCart } from '../../store/slice/order';
import { addFavorite, removeFavorite } from '../../store/slice/favorite';

const cx = classNames.bind(styles);

const FavoriteBtn = (props) => {
  const { id, active: activeFromProps } = props;

  const dispatch = useDispatch();

  const { isLogin } = useSelector(getUser);

  const [active, setActive] = useState(activeFromProps);

  const atClick = useCallback(() => {
    if (!isLogin) {
      alert('請先登入唷');
      return;
    }

    if (active) {
      dispatch(removeFavorite(id));
    }
    else {
      dispatch(addFavorite(id));
    }

    setActive((prev) => !prev);
  }, [active]);

  return (
    <i onClick={atClick}>
      {active ? <FaHeart /> : <FaRegHeart />}
    </i>
  );
};

const ProdItem = (props) => {
  const {
    id,
    type,
    imgUrl,
    name,
    price,
    isFav,
  } = props;

  const dispatch = useDispatch();

  const atClick = useCallback((id) => {
    dispatch(addCart(id));
  }, []);

  return (
    <div className={cx('prod_box')}>
      <div className={cx('prod_img')}>
        <span className={cx('type')}>{type}</span>
        <span className={cx('favorite')}>
          <FavoriteBtn id={id} active={isFav} />
        </span>
        <img src={require(`../../assets/${imgUrl}`).default} alt="" />
      </div>
      <div className={cx('prod_info')}>
        <div>
          <h5>{name}</h5>
        </div>
        <div>
          <p>NT$ {price}</p>
        </div>
      </div>
      <Button type="primary" block onClick={() => atClick(id)}>加入購物車</Button>
    </div>
  );
};

const InfoBox = (props) => {
  const {
    title,
    theme,
    className,
    children
  } = props;

  const boxClass = {
    [`info_box_${theme}`]: theme,
    [className]: className,
  };

  return (
    <div className={cx('info_box', boxClass)}>
      <div className={cx('info_title')}>
        <h3>{title}</h3>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export { ProdItem, InfoBox };