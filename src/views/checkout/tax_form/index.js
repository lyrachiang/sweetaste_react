import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames/bind';
import { FaExclamationCircle } from 'react-icons/fa';

import { Input, Button, Fieldset, InputNumber, Select, Tab, Checkbox } from '../../../components/core';
import styles from './tax_form.module.scss';

import cityAreaData from '../../../api/city_area.json';
import { getOrder, clearCart, updateOrderStatus } from '../../../store/slice/order';

const cx = classNames.bind(styles);

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const taxPattern = /^[0-9]{8}$/;
const cities = Object.keys(cityAreaData);
const tabData = [
  {
    id: 'mail',
    name: '電子發票',
  },
  {
    id: 'post',
    name: '郵寄發票',
  }
];

const TaxForm = (props) => {
  const { step } = props;
  
  let history = useHistory();
  const dispatch = useDispatch();

  const [cityIdx, setCityIdx] = useState(-1);
  const [areaIdx, setAreaIdx] = useState(-1);
  const [currentTab, seCurrentTab] = useState('mail');

  const { shipInfo }  = useSelector(getOrder);
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
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

  const atTabClick = useCallback((id) => {
    seCurrentTab(() => id);

    switch(id) {
      case 'mail':
        clearErrors(['city', 'area', 'address', 'taxNo']);
        reset();
        break;

      case 'post':
        clearErrors(['email', 'taxNo']);
        reset();
        break;
    }
  }, []);

  const atChangeAddress = useCallback((e) => {
    if (e.target.checked) {
      if (shipInfo.city) {
        const selectedCity = cityData().filter((city) => city.label === shipInfo.city);
        setCityIdx(() => selectedCity[0].value);

        const selectedArea = areaData(selectedCity[0].value).filter((area) => area.label === shipInfo.area);
        setAreaIdx(() => selectedArea[0].value);

        setValue('city', shipInfo.city);
        setValue('area', shipInfo.area);
        clearErrors(['city', 'area']);
      }

      if (shipInfo.address) {
        document.querySelector('input[name="address"]').value = shipInfo.address;
        setValue('address', shipInfo.address);
        clearErrors(['address']);
      }
    }
  }, []);

  const atSubmit = useCallback((data) => {
    if (data) {
      const newData = {...data} ;
      newData['taxNo'] = newData['taxNo'] || '';
      
      dispatch(clearCart());
      dispatch(updateOrderStatus('finish'));

      history.push('/finish');
    }
  }, [shipInfo]);

  return (
    <form className={cx('tax_form')} onSubmit={handleSubmit(atSubmit)}>
      <div className={cx('title_box')}>
        <h2>發票</h2>
        {step}
      </div>
      <div>
        <div>
          <Tab
            tabData={tabData}
            activeTab={currentTab}
            onTabClick={atTabClick}
            className={cx('tab_tax_container')}
          />
        </div>
        {currentTab === 'mail' && (
          <>
            <div>
              <Fieldset
                label="電子郵件信箱"
                helperText={errors?.email?.message}
                error={errors.email}
              >
                <Input
                  type="email"
                  placeholder="請輸入電子信箱"
                  suffix={<FaExclamationCircle />}
                  {...register('email', {
                    required: '請輸入電子信箱',
                    shouldUnregister: true,
                    validate: (value) => emailPattern.test(value) || '電子信箱格式錯誤'
                  })}
                />
              </Fieldset>
            </div>
            <div>
              <Fieldset
                label="統一編號（選填）"
                helperText={errors?.taxNo?.message}
                error={errors.taxNo}
              >
                <Controller
                  control={control}
                  name="taxNo"
                  rules={{
                    required: false,
                    shouldUnregister: true,
                    validate: (value) => {
                      if (value) {
                        return taxPattern.test(value) || '統一編號格式錯誤';
                      }
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <InputNumber
                        {...field}
                        format="########"
                        placeholder="請輸入統一編號"
                        iconErr={<FaExclamationCircle />}
                      />
                    );
                  }}
                />
              </Fieldset>
            </div>
          </>
        )}
        {currentTab === 'post' && (
          <>
            <div className={cx('multiple')}>
              <Fieldset
                label="地址"
                helperText={errors?.city?.message}
                error={errors.city}
              >
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: '請選擇城市', shouldUnregister: true }}
                  render={({ field: { onChange } }) => {
                    return (
                      <Select
                        value={cityData()[cityIdx]}
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
                  rules={{ required: '請選擇地區', shouldUnregister: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <Checkbox
                          label="同運送地址"
                          className={cx('address_checkbox')}
                          onChange={atChangeAddress}
                        />
                        <Select
                          placeholder="選擇地區"
                          value={areaIdx === -1 ? value : areaData(cityIdx)[areaIdx]}
                          options={areaData(cityIdx)} 
                          onChange={(e) => {
                            onChange(e);
                            setAreaIdx(e.value);
                          }}
                        />
                      </>
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
                  {...register('address', { required: '請輸入地址', shouldUnregister: true })}
                />
              </Fieldset>
            </div>
            <div>
              <Fieldset
                label="統一編號（選填）"
                helperText={errors?.taxNo?.message}
                error={errors.taxNo}
              >
                <Controller
                  control={control}
                  name="taxNo"
                  rules={{
                    required: false,
                    shouldUnregister: true,
                    validate: (value) => {
                      if (value) {
                        return taxPattern.test(value) || '統一編號格式錯誤';
                      }
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <InputNumber
                        {...field}
                        format="########"
                        placeholder="請輸入統一編號"
                        iconErr={<FaExclamationCircle />}
                      />
                    );
                  }}
                />
              </Fieldset>
            </div>
          </>
        )}
      </div>
      <div>
        <Button type="secondary" block>確認結帳</Button>
      </div>
    </form>
  );
};

export default TaxForm;
