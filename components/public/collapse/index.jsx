import React from 'react';
import {Collapse as CollapseBookstrap} from 'reactstrap';
import {isServer} from '~/helpers/common';

const Collapse = (props) =>
  isServer() ? <div {...props}></div> : <CollapseBookstrap {...props} />;

export default Collapse;
