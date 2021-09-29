import React, { forwardRef, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { FaMinus, FaPlus } from 'react-icons/fa';

import styles from './input_tool.module.scss';

const cx = classNames.bind(styles);

const InputTool = (props, ref) => {
  const { 
    name,
    min = 1,
    max = 20,
    onNumberChange,
  } = props;

  const [value, setValue] = useState(1);

  useEffect(() => {
    onNumberChange(value);
  }, [value]);

  const atMinus = useCallback(() => {
    setValue((state) => {
      const value = state - 1;

      return value < min ? state : value;
    });
  }, []);

  const atPlus = useCallback(() => {
    setValue((state) => {
      const value = state + 1;

      return value > max ? state : value;
    });
  }, []);

  const atChange = useCallback((e) => {
    let number = e.target.value;

    if (number.trim() === '') {
      return;
    }

    return setValue(parseInt(number));
  }, []);

  const atKeyDown = useCallback((e) => {
    e.preventDefault();

    switch(e.keyCode){
      case 38:
        atPlus();
        break;

      case 40:
        atMinus();
        break;

      default:
        return;
    }
  }, []);

  return (
    <div className={cx('input_number')}>
      <button className={cx('minus')} onClick={atMinus}>
        <FaMinus />
      </button>
      <input
        type="text"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={atChange}
        onKeyDown={atKeyDown}
        ref={ref}
      />
      <button className={cx('plus')} onClick={atPlus}>
        <FaPlus />
      </button>
    </div>
  );
};

export default forwardRef(InputTool);