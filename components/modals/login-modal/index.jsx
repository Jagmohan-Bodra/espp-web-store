import {useDispatch, useSelector} from 'react-redux';
import {reqSetVisible} from '../../../reduxs/login-modal/action';
import Modal from './Modal';

const LoginModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.loginModal.visible);
  const okFunc = useSelector((state) => state.loginModal.okFunc);
  const cancelFunc = useSelector((state) => state.loginModal.cancelFunc);
  const propsModal = useSelector((state) => state.loginModal.propsModal);

  const _setVisible = (data) => {
    dispatch(reqSetVisible(data));
  };
  return (
    <Modal
      {...propsModal}
      visible={visible}
      setVisible={_setVisible}
      handleSubmit={(data) => okFunc(data)}
      cancelTest={cancelFunc}
    />
  );
};

export default LoginModal;
