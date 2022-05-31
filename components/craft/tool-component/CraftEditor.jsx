import React from 'react';
import {Editor} from '@craftjs/core';
import {resolver} from '../re-component/common';

const CraftEditor = (props) => {
  return <Editor resolver={resolver()}>{props.children}</Editor>;
};

export default CraftEditor;
