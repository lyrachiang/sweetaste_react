import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './tab.module.scss';

const cx = classNames.bind(styles);

const Tab = (props) => {
  const {
    tabData,
    activeTab,
    className,
    onTabClick,
  } = props;

  const [currentTab, setCurrentTab] = useState(activeTab);

  const atClick = useCallback((id) => {
    setCurrentTab(() => id);

    if (onTabClick) {
      onTabClick(id);
    }
  }, []);

  return (
    <ul className={cx('tab_container', {[className]: className})}>
      {
        tabData.map((item) => {
          const { id, name } = item;

          return (
            <li key={id} className={cx({active: currentTab === id})}>
              <button onClick={(e) => {
                e.preventDefault();
                atClick(id);
              }}>
                {name}
              </button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Tab;