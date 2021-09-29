import React from 'react';
import classNames from 'classnames/bind';

import Container from '../../components/container';
import styles from './banner.module.scss';

const cx = classNames.bind(styles);

const Banner = (props) => {
  const { type, children, className } = props;

  const bannerClass = {
    [`banner_${type}`]: type,
    [className]: className
  };

  return (
    <div className={cx('banner_container')}>
      <Container>
        <div className={cx('banner', bannerClass)}>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
