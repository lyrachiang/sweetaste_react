import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames/bind';
import { FaRegCreditCard, FaExclamationCircle } from 'react-icons/fa';

import { Input, Button, Fieldset, InputNumber, Select } from '../../../components/core';
import styles from './payment_form.module.scss';

const cx = classNames.bind(styles);

const cardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/;

const PaymentForm = (props) => {
  const { step } = props;

  let history = useHistory();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const monthData = useCallback(() => {
    return Array.from(Array(12).keys()).map((item) => {
      return {
        value: item + 1,
        label: item + 1,
      };
    });
  }, []);
  
  const yearData = useCallback(() => {
    return Array.from(Array(5).keys()).map((item) => {
      return {
        value: item + 2022,
        label: item + 2022,
      };
    });
  }, []);

  const atSubmit = useCallback((data) => {
    if (data) {
      // const newData = {
      //   ...data,
      //   month: data.month.value,
      //   year: data.year.value
      // };

      history.push('/checkout/tax');
    }
  }, []);

  return (
    <form className={cx('payment_form')} onSubmit={handleSubmit(atSubmit)}>
      <div className={cx('title_box')}>
        <h2>付款</h2>
        {step}
      </div>
      <div>
        <div>
          <Fieldset
            label="信用卡卡號"
            helperText={errors?.card?.message}
            error={errors.card}
          >
            <Controller
              control={control}
              name="card"
              rules={{
                required: '請輸入信用卡卡號',
                validate: (value) => cardPattern.test(value) || '信用卡卡號格式錯誤'
              }}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    format="################"
                    placeholder=""
                    icon={<FaRegCreditCard />}
                    iconErr={<FaExclamationCircle />}
                  />
                );
              }}
            />
          </Fieldset>
        </div>
        <div className={cx('multiple')}>
          <Fieldset
            label="持卡人姓名"
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
        <div className={cx('multiple')}>
          <Fieldset
            label="有效期限"
            helperText={errors?.month?.message}
            error={errors.month}
          >
            <Controller
              name="month"
              control={control}
              rules={{ required: '請選擇月份' }}
              render={({ field: { onChange } }) => {
                return (
                  <Select
                    isSearchable={false}
                    placeholder="月"
                    options={monthData()} 
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                );
              }}
            />
          </Fieldset>
          <Fieldset
            helperText={errors?.year?.message}
            error={errors.year}
          >
            <Controller
              name="year"
              control={control}
              rules={{ required: '請選擇年' }}
              render={({ field: { onChange } }) => {
                return (
                  <Select
                    isSearchable={false}
                    placeholder="年"
                    options={yearData()} 
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                );
              }}
            />
          </Fieldset>
        </div>
        <div className={cx('multiple')}>
          <Fieldset
            label="卡片末三碼"
            helperText={errors?.cvv?.message}
            error={errors.cvv}
          >
            <Controller
              control={control}
              name="cvv"
              rules={{ required: '請輸入卡片末三碼' }}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    format="###"
                    placeholder=""
                    iconErr={<FaExclamationCircle />}
                  />
                );
              }}
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

export default PaymentForm;
