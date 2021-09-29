import React from 'react';
import classNames from 'classnames/bind';

import styles from './fieldset.module.scss';

const cx = classNames.bind(styles);

type FieldsetProps = {
  label: String,
  helperText: String,
  error: String,
  children: React.ReactNode,
};

const Fieldset = (props:FieldsetProps) => {
  const { label, helperText, error, children } = props;

  return (
    <fieldset className={cx('fieldset_box', { error: error })}>
      {label && (
        <label>{label}</label>
      )}
      {children}
      {helperText && (
        <p className={cx('message')}>{helperText}</p>
      )}
    </fieldset>
  );
};

export default Fieldset;