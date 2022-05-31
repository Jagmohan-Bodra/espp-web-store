import {initializeStore} from '~/reduxs/store';

export const notif = ({message, level}) => {
  const store = initializeStore();
  const notification = ((store.getState().notification || {}).ref || {})
    .current;
  if (notification) {
    notification.clearNotifications();
    notification.addNotification({
      message,
      level: level || 'success',
    });
  }
};
