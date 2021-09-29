import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { FaUserAlt, FaKey, FaExclamationCircle } from 'react-icons/fa';

import Container from '../../components/container';
import { Input, Button, Checkbox, Fieldset } from '../../components/core';
import styles from './login.module.scss';

import { updateUser } from '../../store/slice/user';
import { setFavorite } from '../../store/slice/favorite';

const cx = classNames.bind(styles);

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const userEmail = localStorage.getItem('SweetasteUserRm') || '';
  const [isRemember, setIsRemember] = useState(userEmail !== '');

  const atChangeRemember = useCallback(() => {
    setIsRemember((prev) => !prev);
  }, []);

  const atSubmit = useCallback((data) => {
    dispatch(updateUser(data.email));
    dispatch(setFavorite(data.email));

    if (isRemember) {
      localStorage.setItem('SweetasteUserRm', data.email);
    }
    else {
      localStorage.removeItem('SweetasteUserRm');
    }

    history.push('/');
  }, [isRemember]);

  return (
    <div className={cx('content_container')}>
      <Container>
        <div className={cx('login_container')}>
          <div className={cx('login_box')}>
            <h2>會員登入</h2>
            <form className={cx('login_form')} onSubmit={handleSubmit(atSubmit)}>
              <div>
                <Fieldset
                  helperText={errors?.email?.message}
                  error={errors.email}
                >
                  <Input
                    type="email"
                    placeholder="請輸入電子信箱"
                    defaultValue={userEmail}
                    prefix={<FaUserAlt />}
                    suffix={<FaExclamationCircle />}
                    {...register('email', {
                      required: '請輸入電子信箱',
                      validate: (value) => emailPattern.test(value) || '電子信箱格式錯誤'
                    })}
                  />
                </Fieldset>
                <Fieldset
                  helperText={errors?.password?.message}
                  error={errors.password}
                >
                  <Input
                    type="password"
                    placeholder="請輸入密碼"
                    prefix={<FaKey />}
                    suffix={<FaExclamationCircle />}
                    {...register('password', { required: '請輸入密碼' })}
                  />
                </Fieldset>
                <Fieldset>
                  <Checkbox
                    label="記住我"
                    onChange={atChangeRemember}
                    checked={isRemember}
                  />
                </Fieldset>
              </div>
              <div>
                <Button type="secondary" block>登入帳號</Button>
              </div>
            </form>
          </div>
          <div className={cx('login_img')}>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
