import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Space as AntdSpace} from 'antd';
import {getId, handleStyleChange, debounce} from './common';

export const Space = (props) => {
  const {className, style, componentprops, isNew} = props;
  const {
    id,
    actions: {setProp},
  } = useNode();

  const func = debounce((value) => {
    handleStyleChange(value);
  }, 140);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  const {direction, size, align} = componentprops;

  return (
    <span className={`craft-block`}>
      <div className={`${className}`} id={getId(id)}>
        <AntdSpace
          direction={direction}
          size={!isNaN(size) ? parseInt(size) : size}
          align={align}>
          {props.children}
        </AntdSpace>
      </div>
    </span>
  );
};

export const SpaceDefaultProps = {
  className: 'default-craft',
  componentprops: {},
  isNew: true,
  style: {},
};

Space.craft = {
  displayName: 'Space',
  props: SpaceDefaultProps,
};
