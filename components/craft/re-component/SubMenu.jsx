import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Menu as AntdMenu} from 'antd';
import {getId, handleStyleChange, debounce} from './common';

export const SubMenu = (props) => {
  const {className, style, componentprops, children, isNew, title} = props;
  const {
    id,
    actions: {setProp},
  } = useNode();
  const func = debounce((value) => {
    handleStyleChange(value);
  }, 100);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  return (
    <div className={`${className || ''}`} id={getId(id)} key={isNew}>
      <span className={`craft-block`}>
        <AntdMenu
          {...componentprops}
          mode="horizontal"
          triggerSubMenuAction={'click'}>
          <AntdMenu.SubMenu
            key="SubMenu"
            title={title}
            popupClassName={`sub_menu_popup ${className}_sub`}>
            {(((children || {}).props || {}).children || []).map(
              (content, index) => (
                <AntdMenu.Item key={index}>{content}</AntdMenu.Item>
              ),
            )}
          </AntdMenu.SubMenu>
        </AntdMenu>
      </span>
    </div>
  );
};

SubMenu.craft = {
  displayName: 'SubMenu',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
    title: 'title',
  },
};
