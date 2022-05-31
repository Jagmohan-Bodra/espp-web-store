import React from 'react';
import {Menu as AntdMenu} from 'antd';
import {getId} from './common';
import {useNode} from '@craftjs/core';

export const ItemMenu = (props) => {
  const {className, componentprops, data} = props;
  const {id} = useNode();

  const itemMenuRender = (item, index) => {
    return (
      <AntdMenu.Item
        key={`${item.key}_${index}`}
        icon={
          <span
            className={`icon`}
            dangerouslySetInnerHTML={{__html: item.iconData}}></span>
        }>
        <a href={item.path} title={item.title}>
          {item.title}
        </a>
      </AntdMenu.Item>
    );
  };

  const {mode, theme, expandIcon, triggerSubMenuAction, unExpandIcon} =
    componentprops;

  return (
    <div className={`${className || ''}`} id={getId(id)}>
      <AntdMenu
        mode={mode}
        theme={theme}
        triggerSubMenuAction={triggerSubMenuAction}
        expandIcon={(isExpand) => {
          return isExpand.isOpen ? (
            <span
              className={`expand-icon open`}
              dangerouslySetInnerHTML={{__html: `${expandIcon || ''}`}}></span>
          ) : (
            <span
              className={`expand-icon`}
              dangerouslySetInnerHTML={{
                __html: `${unExpandIcon || ''}`,
              }}></span>
          );
        }}>
        {data.map((item, index) => {
          if ((item.children || []).length > 0) {
            return (
              <AntdMenu.SubMenu
                key={`${item.key}_${index}`}
                title={item.title}
                icon={
                  <span
                    className={`icon`}
                    dangerouslySetInnerHTML={{__html: item.iconData}}></span>
                }
                popupClassName={`sub_menu_popup ${className}_sub`}>
                {item.children.map(itemMenuRender)}
              </AntdMenu.SubMenu>
            );
          }
          return itemMenuRender(item, index);
        })}
      </AntdMenu>
    </div>
  );
};

ItemMenu.craft = {
  displayName: 'ItemMenu',
  props: {
    componentprops: {
      mode: 'horizontal',
      theme: 'light',
      triggerSubMenuAction: 'hover',
      expandIcon: '',
    },
    className: '',
    isNew: true,
    data: [
      {
        key: 'home',
        title: 'Home title',
        iconData: '',
        path: '#',
      },
    ],
  },
};
