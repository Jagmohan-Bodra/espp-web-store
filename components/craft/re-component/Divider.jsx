import React from 'react';
import {Divider as AntdDivider} from 'antd';
import {getId} from './common';
import {useNode} from '@craftjs/core';

export const Divider = (props) => {
  const {className, componentprops} = props;
  const {id} = useNode();

  return (
    <div style={{minHeight: '5px'}}>
      <AntdDivider
        {...componentprops}
        className={`padding-default ${className}`}
        id={getId(id)}
      />
    </div>
  );
};

export const DividerDefaultProps = {
  style: {},
};

Divider.craft = {
  displayName: 'Divider',
  props: DividerDefaultProps,
};
