import React from 'react';
import {useNode} from '@craftjs/core';
import {getId} from './common';

export const MapGoogle = (props) => {
  const {className} = props;
  const {id} = useNode();

  return (
    <span className={`craft-map-google`}>
      <div className={`${className || ''}`} id={getId(id)}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7977.504038682682!2d103.891607!3d1.324679!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd635c6fcd9bb7cc!2sEe%20Sin%20Paper%20Product%20Pte%20Ltd!5e0!3m2!1sen!2smy!4v1622074054784!5m2!1sen!2smy"
          width="100%"
          height="500"
          style={{border: 0}}
          loading="lazy"></iframe>
      </div>
    </span>
  );
};

export const MapGoogleDefaultProps = {
  className: 'default-craft',
  isNew: true,
  style: {},
};

MapGoogle.craft = {
  displayName: 'MapGoogle',
  props: MapGoogleDefaultProps,
};
