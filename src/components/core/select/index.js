import React from 'react';
import ReactSelect from 'react-select';
import classNames from 'classnames/bind';

import styles from './select.module.scss';

const cx = classNames.bind(styles);

type SelectProps = {
  placeholder: String,
  options: Array,
  className: String,
};

const Select = (props:SelectProps) => {
  const {
    placeholder,
    options,
    className,
    ...restProps
  } = props;

  return (
    <ReactSelect
      className={cx('select_input', {[className]: className})}
      placeholder={placeholder}
      options={options} 
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: '#88B5A0',
          primary25: '#88B5A0',
          primary50: '#88B5A0',
        },
      })}
      {...restProps}
    />
  );
};

export default Select;