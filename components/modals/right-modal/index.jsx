import {useDispatch, useSelector} from 'react-redux';
import {reqSetVisible} from '../../../reduxs/right-modal/action';
import Modal from './Modal';

const RightModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.rightModal.visible);
  const okFunc = useSelector((state) => state.rightModal.okFunc);
  const cancelFunc = useSelector((state) => state.rightModal.cancelFunc);
  const propsModal = useSelector((state) => state.rightModal.propsModal);

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

export default RightModal;
