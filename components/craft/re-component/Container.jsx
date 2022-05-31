import {useNode} from '@craftjs/core';
import React from 'react';
import {getId} from './common';

export const Container = (props) => {
  const {className, isContainer} = props;
  const {id} = useNode();
  return (
    <div
      className={`${isContainer ? 'container' : 'container-fluid'} ${
        className || ''
      }`}
      id={getId(id)}>
      {props.children}
    </div>
  );
};

export const ContainerDefaultProps = {
  className: 'default-craft',
  isContainer: true,
  isNew: true,
  style: {},
};

Container.craft = {
  displayName: 'Container',
  props: ContainerDefaultProps,
};
