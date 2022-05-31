import React, {useState, useEffect} from 'react';
import {Modal, ModalBody, Button, ModalHeader, ModalFooter} from 'reactstrap';

const ModalComponent = (props) => {
  // const {
  //   visible, data, setVisible, handleSubmit,
  //   cancelTest, header, closable,
  //   labelNo, labelYes, body, bodycomponent,
  // } = props;
  const [visible, setVisible] = useState(props.visible || false);
  const [data, setData] = useState(props.data || {});

  const handleSubmit = () => {
    props.handleSubmit && props.handleSubmit(data);
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const handleCancel = () => {
    props.setVisible && props.setVisible(false);
    props.cancelTest && props.cancelTest();
    setVisible(false);
  };

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  const closeBtn = (
    <button className="close" onClick={handleCancel}>
      &times;
    </button>
  );

  return (
    <Modal
      className={props.className || ''}
      unmountOnClose={true}
      isOpen={visible}
      toggle={setVisible}
      centered={true}
      style={
        props.width
          ? {maxWidth: props.width, width: '100%'}
          : {maxWidth: '700px', width: '100%'}
      }
      size={props.width ? props.width : '700px'}>
      <ModalHeader toggle={setVisible} close={closeBtn}>
        <b>{props.header || ''}</b>
      </ModalHeader>
      <ModalBody className={``}>
        <div>
          {props.body}
          {props.bodycomponent && (
            <props.bodycomponent
              data={data}
              setData={(data) => setData(data)}
            />
          )}
        </div>
      </ModalBody>
      {!props.isNullFooter && (
        <ModalFooter>
          <Button color="secondary" onClick={handleCancel}>
            {props.labelNo || 'No'}
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {props.labelYes || 'Yes'}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ModalComponent;
