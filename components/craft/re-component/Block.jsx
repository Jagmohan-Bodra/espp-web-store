import React from 'react';
import {useNode} from '@craftjs/core';
import {getId} from './common';

export const Block = (props) => {
  const {className} = props;
  const {id} = useNode();

  return (
    <span className={`craft-block`}>
      <div className={`${className || ''}`} id={getId(id)}>
        {props.children}
      </div>
    </span>
  );
};

export const BlockDefaultProps = {
  className: 'default-craft',
  isNew: true,
  style: {},
};

Block.craft = {
  displayName: 'Block',
  props: BlockDefaultProps,
};
