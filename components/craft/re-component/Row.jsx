import React from 'react';
import {Row as AntdRow} from 'antd';
import {getId} from './common';
import {useNode} from '@craftjs/core';

export const Row = (props) => {
  const {className, componentprops} = props;
  const {gutterHorizontal, gutterVertical, align, justify} = componentprops;
  const {id} = useNode();

  return (
    <AntdRow
      className={`${className}`}
      id={getId(id)}
      gutter={[parseInt(gutterHorizontal) || 0, parseInt(gutterVertical) || 0]}
      align={align}
      justify={justify}>
      {props.children}
    </AntdRow>
  );
};

export const RowDefaultProps = {
  className: 'default-craft',
  componentprops: {},
  isNew: true,
  style: {},
};

Row.craft = {
  displayName: 'Row',
  props: RowDefaultProps,
};
