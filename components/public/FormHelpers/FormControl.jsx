import React from 'react';
import {Row, Col} from 'antd';
// import './style.scss'
// import styles from 'styles.module.scss'

export const FormControl = (props) => {
  const cssClass = 'form-control-row';
  const {label, labelTop, children, span1, span2, offset} = props;
  return (
    <div className={`${cssClass}`}>
      <Row>
        {label && (
          <Col span={span1 || 6} offset={offset || 0}>
            <label className={`${cssClass}_label`}>{label}</label>
          </Col>
        )}
        {labelTop && (
          <Col span={span1 || 24} offset={offset || 1}>
            <label>{labelTop}</label>
          </Col>
        )}
        <Col span={span2 || 22} offset={offset || 1}>
          <div className={`${cssClass}_form center`}>{children}</div>
        </Col>
      </Row>
    </div>
  );
};
