import * as Types from './type';

export const reqGetDetails = (data) => (dispatch) => {
  dispatch(actGetDetails(data));
};

const actGetDetails = (data) => {
  return {
    type: Types.GET_PRODUCT_DETAILS,
    data,
  };
};
