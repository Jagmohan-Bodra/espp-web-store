import React from 'react';
import {getId} from '../common';

export const Field = ({obj, text, className, id}) => {
  return (
    <div className={`${className || ''}`} id={getId(id)}>
      <span className={`craft-block`}>{(obj || {})[text] || text}</span>
    </div>
  );
};

Field.craft = {
  displayName: 'Field',
  props: {
    text: 'Field',
    fontSize: 14,
    isNew: true,
    style: {},
  },
};
