import React from 'react';
import {Frame, Element, useEditor} from '@craftjs/core';
import {PageContainer} from '../re-component/PageContainer';
import {useEffect} from 'react';
import {genderComponentById} from '../build-component/common';

const CraftFrame = (props) => {
  const {themeData} = props;
  const {actions} = useEditor();
  useEffect(() => {
    props.data && actions.deserialize(props.data);
  }, [props.data, props.reset]);

  useEffect(() => {
    actions.setOptions((options) => (options.enabled = false));
  }, []);

  return themeData ? (
    genderComponentById(JSON.parse(themeData))
  ) : (
    <Frame {...props}>
      <Element is={PageContainer} canvas></Element>
    </Frame>
  );
};

export default CraftFrame;
