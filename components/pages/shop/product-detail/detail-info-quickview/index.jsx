import React from 'react';
import PropTypes from 'prop-types';
import PrductDetailInfo from '~/components/pages/shop/product-detail/detail-info';
const clsName = 'product-detail-quick-view';

const PrductDetailInfoQuickView = (props) => {
  return (
    <div className={`${clsName} ${props.classWrap || ''}`}>
      <PrductDetailInfo data={props.data} isQuickView />
    </div>
  );
};

PrductDetailInfoQuickView.propTypes = {
  data: PropTypes.object,
};

PrductDetailInfoQuickView.defaultProps = {
  data: {},
};

export default PrductDetailInfoQuickView;
