import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';

import Container from '../../components/container';
import Banner from '../../components/banner';
import { Button } from '../../components/core';
import { InfoBox, ProdItem } from '../../components/page';
import styles from './favorite.module.scss';

import { fetchProd, fetchProdType, getProd } from '../../store/slice/prod';
import { getOrder } from '../../store/slice/order';
import { getUser } from '../../store/slice/user';
import { getFavorite } from '../../store/slice/favorite';

const cx = classNames.bind(styles);

const Favorite = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProd());
    dispatch(fetchProdType());
  }, []);
  
  const { prodList, prodTypeList } = useSelector(getProd);
  const { cartList } = useSelector(getOrder);
  const { isLogin } = useSelector(getUser);
  const { favoriteList } = useSelector(getFavorite);

  return (
    <>
      <Banner type="favorite" />
      <div>
        <Container>
          <div className={cx('content_container')}>
            <InfoBox title="我的最愛">
              {isLogin ? (
                favoriteList.length > 0 ? (
                  <div className={cx('favorite_block')}>
                    {
                      favoriteList.map((item) => {
                        const { id } = item;
        
                        const itemData = prodList[id];
        
                        if (itemData) {
                          const prodTypeData = prodTypeList[itemData.typeId] ;
                          const isAddCart = cartList.filter((item) => item.id === id).length > 0;
        
                          return (
                            <div key={id}>
                              <div className={cx('gap')}>
                                <ProdItem
                                  id={id}
                                  type={prodTypeData && prodTypeData.name}
                                  imgUrl={itemData.pic}
                                  name={itemData.name}
                                  price={itemData.price}
                                  isFav={true}
                                  isAddCart={isAddCart}
                                />
                              </div>
                            </div>
                          );
                        }
                      })
                    }
                  </div>
                ) : (
                  <div className={cx('message_block')}>
                    <p>目前沒有加入任何最愛商品唷</p>
                  </div>
                )
              ) : (
                <div className={cx('message_block')}>
                  <p>需登入後才可查看唷</p>
                  <Button
                    type="secondary"
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    前往登入
                  </Button>
                </div>
              )}
            </InfoBox>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Favorite;
