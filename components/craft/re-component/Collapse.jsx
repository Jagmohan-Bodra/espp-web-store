import React from 'react';
import {Collapse as AntdCollapse} from 'antd';
import {getId} from './common';
import {useNode} from '@craftjs/core';

export const Collapse = (props) => {
  const {className, componentprops, children, header} = props;
  const {expand} = componentprops;
  const defaultActiveKey = expand ? ['collapse/.0'] : [];
  const {id} = useNode();

  return (
    <div className={`${className || ''}`} id={getId(id)}>
      <AntdCollapse {...componentprops} defaultActiveKey={defaultActiveKey}>
        {React.Children.map(children, (content) => (
          <AntdCollapse.Panel header={header} key={'collapse'}>
            {content}
          </AntdCollapse.Panel>
        ))}
      </AntdCollapse>
    </div>
  );
};

Collapse.craft = {
  displayName: 'Collapse',
  props: {
    componentprops: {},
    className: '',
    isNew: true,
    header: `Header`,
  },
};
