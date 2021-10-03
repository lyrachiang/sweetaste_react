import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

const Button = (props) => {
  const {
    type,
    href,
    block,
    disabled,
    children,
    className,
    onClick,
  } = props;

  const btnClass = {
    [`btn_${type}`]: type,
    block: block,
    disabled: disabled,
    [className]: className,
  };

  const atClick = useCallback((e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (href) {
      window.location.href = href;
    }
  }, []);

  return (
    <button className={cx('btn', btnClass)} onClick={atClick}>
      {children}
    </button>
  );
};

export default Button;
