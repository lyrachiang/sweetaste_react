import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';

import Container from '../../components/container';
import Banner from '../../components/banner';
import { ProdItem } from '../../components/page';
import styles from './home.module.scss';

import { fetchProd, fetchProdType, getProd } from '../../store/slice/prod';
import { getOrder } from '../../store/slice/order';
import { getFavorite } from '../../store/slice/favorite';

import { articleData } from './data';

const cx = classNames.bind(styles);

const Tab = (props) => {
  const { dataSource, activeTab, onChange } = props;

  const [currentTab, setCurrentTab] = useState(activeTab);

  const atClick = useCallback((id, type) => {
    if (onChange) {
      onChange(id, type);
    }

    setCurrentTab(() => id);
  }, []);

  return (
    <div className={cx('tab_block')}>
      {
        dataSource.map((item) => {
          const { id, name, enName } = item;

          return (
            <div key={id}>
              <div className={cx('gap')}>
                <div
                  className={cx('tab_box', {active: currentTab === id})}
                  onClick={() => atClick(id, enName)}
                >
                  <span>{name}</span>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

const ArticleItem = (props) => {
  const { title, titleImgUrl, imgUrl, content } = props;

  return (
    <div className={cx('article_block')}>
      <div>
        <div className={cx('gap')}>
          <div className={cx('article_img')} style={{backgroundImage: `url(${require(`../../assets/imgs/prod/${imgUrl}.jpg`).default})`}}></div>
        </div>
      </div>
      <div>
        <div className={cx('gap')}>
          <div className={cx('article_box')}>
            <div>
              {
                content.map((text, idx) => {
                  return <p key={idx}>{text}</p>;
                })
              }
            </div>
            <img src={require(`../../assets/imgs/solgan/${titleImgUrl}.svg`).default} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  useEffect(() => {
    dispatch(fetchProd());
    dispatch(fetchProdType());
  }, []);

  const { prodList, prodTypeList } = useSelector(getProd);
  const { cartList } = useSelector(getOrder);
  const { favoriteList } = useSelector(getFavorite);

  const filterProd = Object.values(prodList).filter((item) => {
    return item.typeId === 'T01';
  });

  return (
    <>
      <Banner type="index" />
      <div className={cx('tab_container')}>
        <Tab
          dataSource={Object.values(prodTypeList)}
          activeTab='T01'
          onChange={(typeId, typeName) => {
            history.push(`/product/${typeName}`);
          }}
        />
      </div>
      {
        articleData.map((item) => {
          const { id, title, titleImgUrl } = item;
          return (
            <div key={id} className={cx('article_container')}>
              <div className={cx('article_title')}>
                <img src={require(`../../assets/imgs/solgan/${titleImgUrl}_mobile.svg`).default} alt={title} />
              </div>
              <div className={cx('article_content')}>
                <Container>
                  <ArticleItem {...item} />
                </Container>
              </div>
            </div>
          );
        })
      }
      <div>
        <Container>
          <div className={cx('slogan_container')}>
            <div className={cx('slogan_desktop')}>
              <img src={require('../../assets/imgs/solgan/img_solgan_4.svg').default} alt="想吃甜點是不需要理由的" />
            </div>
            <div className={cx('slogan_mobile')}>
              <img src={require('../../assets/imgs/solgan/img_solgan_4_mobile.svg').default} alt="想吃甜點是不需要理由的" />
            </div>
          </div>
          <div className={cx('prod_container')}>
            {
              filterProd.slice(0, 3).map((item) => {
                const { id, typeId, name, price, pic } = item;

                const prodTypeData = prodTypeList[typeId];
                const isFav = favoriteList.filter((item) => item.id === id).length > 0 || false;
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
            }
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
