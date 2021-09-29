import React from 'react';
import classNames from 'classnames/bind';

import Header from './header';
import Footer from './footer';

import styles from './layout.module.scss';

const cx = classNames.bind(styles);

const Layout = (props) => {
  const { children } = props;

  return (
    <div className={cx('wrapper')}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
