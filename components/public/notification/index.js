import {useEffect, useRef} from 'react';
import NotificationSystem from 'react-notification-system';
import {useDispatch} from 'react-redux';
import {reqSetNotification} from '~/reduxs/notification/action';

const Notification = () => {
  const dispatch = useDispatch();
  const notificationSystem = useRef(null);

  useEffect(() => {
    dispatch(reqSetNotification(notificationSystem));
  }, [notificationSystem]);

  return <NotificationSystem ref={notificationSystem} />;
};

export default Notification;
