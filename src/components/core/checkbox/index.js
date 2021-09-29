import React from 'react';
import classNames from 'classnames/bind';

import styles from './checkbox.module.scss';

const cx = classNames.bind(styles);

const Checkbox = (props) => {
  const { label, value, className, onChange, ...restProps } = props;

  return (
    <label className={cx('checkbox', {[className]: className})}>
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        {...restProps}
      />
      <span className={cx('checkmark')}></span>
      {label}
    </label>
  );
};

export default Checkbox;