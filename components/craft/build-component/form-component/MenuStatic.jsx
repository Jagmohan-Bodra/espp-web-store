import {Space} from 'antd';
import React from 'react';
import {FindIcon, StoreIcon, UserMenuIcon} from '../../../../lib/icons';
import styles from './styles.module.scss';

const MenuStatic = () => {
  return (
    <div className={styles.menu_static_block}>
      <Space className={styles.menu_static}>
        <div style={{display: 'flex'}}>
          <div className={styles.menu_static_group}>
            <div className={styles.menu_static_item}>
              <FindIcon />
            </div>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div className={styles.menu_static_group}>
            <div className={styles.menu_static_item}>
              <StoreIcon />
            </div>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div className={styles.menu_static_group}>
            <div className={styles.menu_static_item}>
              <UserMenuIcon />
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
};

MenuStatic.craft = {
  displayName: 'MenuStatic',
};

export default MenuStatic;
