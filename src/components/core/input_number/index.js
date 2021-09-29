import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import classNames from 'classnames/bind';

import styles from './input_number.module.scss';

const cx = classNames.bind(styles);

const InputNumber = (props, ref) => {
  const { 
    format,
    placeholder,
    iconErr,
    icon,
    className,
    ...restProps
  } = props;

  return (
    <div className={cx('input_number', {[className]: className})}>
      <NumberFormat
        format={format}
        placeholder={placeholder}
        ref={ref}
        {...restProps}
      />
      {icon && <i>{icon}</i>}
      {iconErr && <span>{iconErr}</span>}
    </div>
  );
};

export default forwardRef(InputNumber);