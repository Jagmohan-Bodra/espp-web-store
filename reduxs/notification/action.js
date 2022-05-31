import * as Types from './type';

export const reqSetNotification = (ref) => (dispatch) => {
  dispatch(actSetNotification(ref));
};

const actSetNotification = (data) => {
  return {
    type: Types.NOTIFICATION_SET_REF,
    data,
  };
};
