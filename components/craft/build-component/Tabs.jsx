import React from 'react';
import {Tabs as AntdTabs} from 'antd';
import {getId} from './common';

export const Tabs = (props) => {
  const {className, componentprops, children, data, isNew, id} = props;
  const {tabPosition, size, typeprops} = componentprops;

  return (
    <div className={`${className || ''}`} id={getId(id)} key={isNew}>
      <div className={`craft-block`} data-id={`Collapse ${id}`}>
        <AntdTabs
          {...componentprops}
          type={typeprops === 'editable-card' ? 'line' : typeprops || 'line'}
          tabPosition={tabPosition}
          size={size}>
          {(((children || {}).props || {}).children || []).map(
            (content, index) => (
              <AntdTabs.TabPane
                tab={(data[index] || {}).title || ''}
                key={index}
                closable={true}>
                {content}
              </AntdTabs.TabPane>
            ),
          )}
        </AntdTabs>
      </div>
    </div>
  );
};

Tabs.craft = {
  displayName: 'Tabs',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
    data: [],
  },
};
