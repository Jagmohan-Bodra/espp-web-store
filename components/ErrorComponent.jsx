import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isArray} from 'validate.js';
import NotificationSystem from 'react-notification-system';

import {dropError} from '../reduxs/error/action';
import {debounce} from '~/helpers/common';

const isObject = (e) => typeof e === 'object' && e !== null;
const func = debounce((method) => method(), 1000);

const ErrorComponent = () => {
  const dispatch = useDispatch();
  const notificationSystem = useRef(null);
  const error = useSelector((state) => state.error);

  const showErr = () => {
    if (error.isErr) {
      openNotification();
      func(() => dispatch(dropError()));
    }
  };

  useEffect(() => {
    showErr();
  }, [error.isErr]);

  const getMessage = () => {
    var notif = error.message.message;
    if (isArray(notif) && notif.length > 0) {
      var list = '<ul>';
      notif.map((item) => {
        list += `<li><b>${item.arg}</b>: ${item.reason}</li>`;
      });
      list += '</ul>';
      return (
        <span
          style={{color: '#4B5B79'}}
          dangerouslySetInnerHTML={{__html: list}}></span>
      );
    }

    if (isObject(notif) && notif.arg && notif.reason) {
      const mes = `<span><b>${notif.arg}</b>: ${notif.reason}</span>`;
      return (
        <span
          style={{color: '#4B5B79'}}
          dangerouslySetInnerHTML={{__html: mes}}></span>
      );
    }

    return JSON.stringify(notif || '');
  };

  const openNotification = () => {
    notificationSystem && notificationSystem.current.clearNotifications();
    notificationSystem &&
      notificationSystem.current.addNotification({
        message: getMessage(),
        level: error.level || 'warning',
      });
  };
  return <NotificationSystem ref={notificationSystem} />;
};

export default ErrorComponent;
