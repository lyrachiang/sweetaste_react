import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FaShoppingCart } from 'react-icons/fa';

import Container from '../../../components/container';
import styles from './header.module.scss';

import { getUser, updateUser } from '../../../store/slice/user';
import { getOrder, clearCart } from '../../../store/slice/order';
import { setFavorite } from '../../../store/slice/favorite';

const cx = classNames.bind(styles);

const Header = () => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const dispatch = useDispatch();

  const { isLogin } = useSelector(getUser);
  const { cartList } = useSelector(getOrder);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    if (windowSize >= 768 && isMenuActive) {
      document.body.classList.remove('fixed_body');
      setMenuActive(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  const atMenuClick = useCallback(() => {
    if (windowSize < 768) {
      setMenuActive((prev) => {
        if (!prev) {
          document.body.classList.add('fixed_body');
        }
        else {
          document.body.classList.remove('fixed_body');
        }
  
        return !prev;
      });
    }
  }, [windowSize]);

  const atLoginout = useCallback(() => {
    dispatch(updateUser(''));
    dispatch(clearCart());
    dispatch(setFavorite(''));

    window.location.reload();
  }, []);

  return (
    <header>
      <Container>
        <div className={cx('header_block')}>
          <div className={cx('toggle_menu', {active: isMenuActive})} onClick={atMenuClick}>
            <span></span>
          </div>
          <div className={cx('logo')}>
            <Link to="/">
              <img className={cx('logo_desktop')} src={require('../../../assets/imgs/img_logo_1.svg').default} alt="logo_sweetaste" />
              <img className={cx('logo_mobile')} src={require('../../../assets/imgs/img_logo_mobile.svg').default} alt="logo_sweetaste" />
            </Link>
          </div>
          <div className={cx('nav')}>
            <ul className={cx('menu_list', {active: isMenuActive})}>
              <li onClick={atMenuClick}>
                <NavLink to="/" exact activeClassName={cx('active')}>
                  <span>首頁</span>
                </NavLink>
              </li>
              <li onClick={atMenuClick}>
                <NavLink to="/product" exact activeClassName={cx('active')}>
                  <span>甜點</span>
                </NavLink>
              </li>
              <li onClick={atMenuClick}>
                <NavLink to="/favorite" exact activeClassName={cx('active')}>
                  <span>我的最愛</span>
                </NavLink>
              </li>
              {!isLogin ? (
                <li onClick={atMenuClick}>
                  <NavLink to="/login" exact activeClassName={cx('active')}>
                    <span>登入</span>
                  </NavLink>
                </li>
              ):(
                <li onClick={atLoginout}>
                  <Link to="/">
                    <span>登出</span>
                  </Link>
                </li>
              )}
            </ul>
            <NavLink to="/cart" className={cx('btn_cart')} activeClassName={cx('active')}>
              <i><FaShoppingCart /></i>
              {cartList.length > 0 && (
                <div className={cx('cart_count')}>
                  <span>{cartList.length}</span>
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
