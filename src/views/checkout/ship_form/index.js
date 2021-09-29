import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames/bind';
import { FaExclamationCircle } from 'react-icons/fa';

import { Input, Button, Fieldset, InputNumber, Select } from '../../../components/core';
import styles from './ship_form.module.scss';

import cityAreaData from '../../../api/city_area.json';
import { updateShipInfo } from '../../../store/slice/order';

const cx = classNames.bind(styles);

const phonePattern = /^09\d{2}-?\d{3}-?\d{3}$/;
const cities = Object.keys(cityAreaData);

const ShipForm = (props) => {
  const { step } = props;

  let history = useHistory();
  const dispatch = useDispatch();

  const [cityIdx, setCityIdx] = useState(-1);
  const [areaIdx, setAreaIdx] = useState(-1);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const cityData = useCallback(() => {
    let data = [];
  
    cities.map((item, idx) => {
      data.push({
        value: idx,
        label: item
      });
    });
  
    return data;
  }, []);
  
  const areaData = useCallback((cityIdx) => {
    let data = [];
 
    if (cityIdx >= 0) {
      cityAreaData[cities[cityIdx]].map((item, idx) => {
        const { name, zip } = item;
    
        data.push({
          value: idx,
          label: name,
          zip: zip
        });
      });
    }

    return data;
  }, []);

  const atSubmit = useCallback((data) => {
    if (data) {
      const newData = {
        ...data,
        city: cities[cityIdx],
        area: cityAreaData[cities[cityIdx]][areaIdx].name
      };

      dispatch(updateShipInfo(newData));

      history.push('/checkout/payment');
    }
  }, [cityIdx, areaIdx]);

  return (
    <form className={cx('ship_form')} onSubmit={handleSubmit(atSubmit)}>
      <div className={cx('title_box')}>
        <h2>運送</h2>
        {step}
      </div>
      <div>
        <div className={cx('multiple')}>
          <Fieldset
            label="姓氏"
            helperText={errors?.lastName?.message}
            error={errors.lastName}
          >
            <Input
              type="text"
              placeholder=""
              suffix={<FaExclamationCircle />}
              {...register('lastName', { required: '請輸入姓氏' })}
            />
          </Fieldset>
          <Fieldset
            label="名字"
            helperText={errors?.firstName?.message}
            error={errors.firstName}
          >
            <Input
              type="text"
              placeholder=""
              suffix={<FaExclamationCircle />}
              {...register('firstName', { required: '請輸入名字' })}
            />
          </Fieldset>
        </div>
        <div>
          <Fieldset
            label="手機"
            helperText={errors?.phone?.message}
            error={errors.phone}
          >
            <Controller
              control={control}
              name="phone"
              rules={{
                required: '請輸入手機',
                validate: (value) => phonePattern.test(value) || '手機格式錯誤'
              }}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    format="####-###-###"
                    placeholder="09xx-xxx-xxx"
                    iconErr={<FaExclamationCircle />}
                  />
                );
              }}
            />
          </Fieldset>
        </div>
        <div className={cx('multiple')}>
          <Fieldset
            label="地址"
            helperText={errors?.city?.message}
            error={errors.city}
          >
            <Controller
              name="city"
              control={control}
              rules={{ required: '請選擇城市' }}
              render={({ field: { onChange } }) => {
                return (
                  <Select
                    placeholder="選擇城市"
                    options={cityData()} 
                    onChange={(e) => {
                      onChange(e);
                      setValue('area', null);

                      setCityIdx(e.value);
                      setAreaIdx(-1);
                    }}
                  />
                );
              }}
            />
          </Fieldset>
          <Fieldset
            helperText={errors?.area?.message}
            error={errors.area}
          >
            <Controller
              name="area"
              control={control}
              rules={{ required: '請選擇地區' }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    placeholder="選擇地區"
                    value={value}
                    options={areaData(cityIdx)} 
                    onChange={(e) => {
                      onChange(e);
                      setAreaIdx(e.value);
                    }}
                  />
                );
              }}
            />
          </Fieldset>
        </div>
        <div>
          <Fieldset
            helperText={errors?.address?.message}
            error={errors.address}
          >
            <Input
              type="text"
              placeholder="請輸入地址"
              suffix={<FaExclamationCircle />}
              {...register('address', { required: '請輸入地址' })}
            />
          </Fieldset>
        </div>
      </div>
      <div>
        <Button type="secondary" block>下一步</Button>
      </div>
    </form>
  );
};

export default ShipForm;
