import React from 'react';
import {useNode} from '@craftjs/core';
import {getId} from './common';
import ReadOnlyExample from '../../public/slate/ReadOnlyExample';

export const Text = ({textValue, children}) => {
  const {id} = useNode();

  return (
    <div className={`${id}`} id={getId(id)}>
      <span className={`craft-block`}>
        <ReadOnlyExample value={textValue} />
        {children}
      </span>
    </div>
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Hi',
    fontSize: 14,
    isNew: true,
    style: {},
  },
};
