import React from 'react';
import {Pagination} from 'antd';

const PaganitionBlock = (props) => {
  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a> {'< Prev'}</a>;
    }
    if (type === 'next') {
      return <a>{'Next >'}</a>;
    }
    return originalElement;
  };
  return <Pagination itemRender={itemRender} {...props} />;
};

export default PaganitionBlock;
