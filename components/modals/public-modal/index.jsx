import {useDispatch, useSelector} from 'react-redux';
import {reqSetVisible} from '../../../reduxs/public-modal/action';
import Modal from './Modal';

const LoginModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.publicModal.visible);
  const okFunc = useSelector((state) => state.publicModal.okFunc);
  const cancelFunc = useSelector((state) => state.publicModal.cancelFunc);
  const propsModal = useSelector((state) => state.publicModal.propsModal);

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
