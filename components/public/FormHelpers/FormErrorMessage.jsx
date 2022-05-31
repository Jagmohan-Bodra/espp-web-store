import React from 'react';
import {FormFeedback} from 'reactstrap';
import {isEmpty} from 'validate.js';

export const FormErrorMessage = ({data, className}) => {
  if (!isEmpty(data)) {
    return (
      <FormFeedback className={className || ''}>
        {data.map((err, i) => (
          <span key={i}>{err}</span>
        ))}
      </FormFeedback>
    );
  }
};
