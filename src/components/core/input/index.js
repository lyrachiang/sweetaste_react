import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';

import { Button } from '../../../components/core';

import styles from './input.module.scss';

const cx = classNames.bind(styles);

const Input = (props, ref) => {
  const {
    type,
    placeholder,
    prefix,
    suffix,
    enterButton,
    buttonHref,
    onClickBtn,
    ...restProps
  } = props;

  return (
    <div className={cx('input_block')}>
      {prefix && <span className={cx('input_prefix')}>{prefix}</span>}
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...restProps}
      />
      {suffix && <span className={cx('input_suffix')}>{suffix}</span>}
      {enterButton && (
        <Button
          type="secondary"
          className={cx('input_btn')}
          href={buttonHref}
          onClick={onClickBtn}
        >
          {enterButton}
        </Button>
      )}
    </div>
  );
};

export default forwardRef(Input);