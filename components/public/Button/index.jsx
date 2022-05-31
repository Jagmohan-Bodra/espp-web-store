import React from 'react';
import {Button} from 'reactstrap';
import styles from './styles.module.scss';

export const ButtonLink = (props) => {
  return <button className={styles.btnLink}>{props.text}</button>;
};

export const ButtonBlue = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={[styles.btnMain, props.stylescustum]}>
      {props.text}
    </Button>
  );
};

export const ButtonTransparent = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={[styles.btnTransparent, props.stylescustum]}>
      {props.text}
    </Button>
  );
};

export const ButtonCustum = (props) => {
  return (
    <Button
      {...props}
      size={props.size || 'default'}
      className={[styles.btnCustum, props.stylescustum]}>
      {props.text}
    </Button>
  );
};
