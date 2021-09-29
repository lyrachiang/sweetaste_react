import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

import Container from '../../../components/container';
import { Input } from '../../../components/core';

import styles from './footer.module.scss';

const cx = classNames.bind(styles);

const socialData = [
  {
    title: 'line',
    img: 'ico_line',
    link: 'https://line.me/zh-hant/',
  },
  {
    title: 'facebook',
    img: 'ico_facebook',
    link: 'https://zh-tw.facebook.com/',
  }
];

const Footer = () => {
  return (
    <footer>
      <div className={cx('mail_container')}>
        <Container className={cx('footer_container')}>
          <div className={cx('mail_block')}>
            <div>
              <span>
                <img src={require('../../../assets/imgs/icons/ico_logo_white.svg').default} alt="logo_sweetaste" />
              </span>
              <h4>訂閱你我的甜蜜郵件</h4>
            </div>
            <div>
              <Input
                type="email"
                prefix={<FaEnvelope />}
                enterButton={<FaArrowRight />}
                buttonHref="mailto:sweetaste@email.com"
              />
            </div>
          </div>
        </Container>
      </div>
      <div className={cx('info_container')}>
        <Container className={cx('footer_container')}>
          <div className={cx('contact_info')}>
            <div className={cx('contact_box')}>
              <div>
                <img src={require('../../../assets/imgs/img_logo_2.svg').default} alt="logo_sweetaste" />
              </div>
              <ul className={cx('contact_list')}>
                <li>
                  <a href="tel:07-1234-5678">07-1234-5678</a>
                </li>
                <li>
                  <a href="mailto:sweetaste@email.com">sweetaste@email.com</a>
                </li>
                <li>
                  800 高雄市新興區幸福路 520 號
                </li>
              </ul>
            </div>
            <div className={cx('img_slogan')}>
              <img src={require('../../../assets/imgs/solgan/img_solgan_1.svg').default} alt="今天是個吃甜點的好日子" />
            </div>
          </div>
          <div className={cx('social_info')}>
            <ul className={cx('social_list')}>
              {
                socialData.map((item) => {
                  const { title, img, link } = item;
                  
                  return (
                    <li key={title}>
                      <Link to={link} target="_blank">
                        <img src={require(`../../../assets/imgs/icons/${img}.svg`).default} alt={title} />
                      </Link>
                    </li>
                  );
                })
              }
            </ul>
            <p className={cx('copy_right')}>© 2018 Sweetaste* All Rights Reserved</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
