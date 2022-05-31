import React from 'react';
import {useNode} from '@craftjs/core';
import {getId} from './common';

export const FieldImage = (props) => {
  const {obj, text, className, componentprops} = props;
  const {id} = useNode();
  return (
    <div className={`${className || ''}`}>
      <span className={`craft-block`} id={getId(id)}>
        <img
          src={(obj || {})[text] || ''}
          alt={componentprops.alt || ''}
          width={50}
          height={50}
          id={getId(id)}
        />
      </span>
    </div>
  );
};

FieldImage.craft = {
  displayName: 'FieldImage',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
  },
};
