import React from 'react';
import {Button as MaterialButton} from 'antd';
import {getId} from './common';
import {useNode} from '@craftjs/core';

export const Button = (props) => {
  const {className, componentprops, children} = props;
  const {size, herf, typeButton, block} = componentprops || {};
  const {id} = useNode();

  return (
    <div>
      <MaterialButton
        id={getId(id)}
        className={`${className || ''}`}
        size={size}
        herf={herf}
        type={typeButton}
        block={block}>
        {children}
      </MaterialButton>
    </div>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    componentprops: {},
    className: '',
    isNew: true,
  },
};
