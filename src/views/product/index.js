import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Container from '../../components/container';
import Banner from '../../components/banner';
import { ProdItem } from '../../components/page';
import styles from './product.module.scss';

import { fetchProd, fetchProdType, getProd } from '../../store/slice/prod';
import { getOrder } from '../../store/slice/order';
import { getFavorite } from '../../store/slice/favorite';

const cx = classNames.bind(styles);

const Product = () => {
  const dispatch = useDispatch();

  let history = useHistory();
  let { prodType } = useParams();

  const { cartList } = useSelector(getOrder);
  const { favoriteList } = useSelector(getFavorite);

  const [currentType, setCurrentType] = useState(prodType);

  useEffect(() => {
    dispatch(fetchProd());
    dispatch(fetchProdType());
  }, []);

  useEffect(() => {
    let typeId = '';

    switch(prodType) {
      case 'daily':
        typeId = 'T01';
        break;
      
      case 'recommend':
        typeId = 'T02';
        break;

      case 'new':
        typeId = 'T03';
        break;
      
      default:
        typeId = 'All';
        break;
    }

    setCurrentType(() => typeId);
  }, [prodType]);

  const { prodList, prodTypeList } = useSelector(getProd);

  const filterProd = Object.values(prodList).filter((item) => {
    if (currentType === 'All') {
      return true;
    }

    return item.typeId === currentType;
  });

  return (
    <>
      <Banner type="product">
        <div className={cx('banner_box')}>
          <img src={require('../../assets/imgs/solgan/img_solgan_4.svg').default} alt="想吃甜點是不需要理由的" />
        </div>
      </Banner>
      <div>
        <Container>
          <div className={cx('content_container')}>
            <div>
              <div className={cx('gap')}>
                <div className={cx('prod_type_container')}>
                  <h3>甜點類別</h3>
                  <ul>
                    <li
                      className={cx({active: currentType === 'All'})}
                      onClick={() => {
                        setCurrentType(() => 'All');
                        history.push('/product');
                      }}
                    >
                      所有甜點 ({Object.values(prodList).length})
                    </li>
                    {prodTypeList && (
                      Object.values(prodTypeList).map((item) => {
                        const { id, name, enName, total } = item;

                        return (
                          <li
                            key={id}
                            className={cx({active: currentType === id})}
                            onClick={() => {
                              setCurrentType(() => id);
                              history.push(`/product/${enName}`);
                            }}
                          >
                            {name} ({total})
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className={cx('gap')}>
                <div>
                  <div className={cx('prod_container')}>
                    {filterProd.length > 0 && (
                      filterProd.map((item) => {
                        const { id, typeId, name, price, pic } = item;

                        const prodTypeData = prodTypeList[typeId] ;
                        const isFav = favoriteList.filter((item) => item.id === id).length > 0;
                        const isAddCart = cartList.filter((item) => item.id === id).length > 0;

                        return (
                          <div key={id}>
                            <div className={cx('gap')}>
                              <ProdItem
                                id={id}
                                type={prodTypeData && prodTypeData.name}
                                imgUrl={pic}
                                name={name}
                                price={price}
                                isFav={isFav}
                                isAddCart={isAddCart}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Product;
