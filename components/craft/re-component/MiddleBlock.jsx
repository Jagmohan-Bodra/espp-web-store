import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {getId, handleStyleChange, debounce} from './common';

export const MiddleBlock = (props) => {
  const {className, style, isNew} = props;
  const {
    connectors: {connect, drag},
    selected,
    id,
    actions: {setProp},
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const func = debounce((value) => {
    handleStyleChange(value);
  }, 180);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  return (
    <span
      className={`craft-block ${className} ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}
      data-id={`Middle Block ${id}`}>
      <div className={`flex-div`}>
        <div className={`middle-flex-div`}>
          <div id={getId(id)}>{props.children}</div>
        </div>
      </div>
    </span>
  );
};

export const MiddleBlockDefaultProps = {
  className: 'default-craft',
  isNew: true,
  style: {},
};

MiddleBlock.craft = {
  displayName: 'Middle Block',
  props: MiddleBlockDefaultProps,
};
