import {useEffect, useState} from 'react';

const RightModal = (props) => {
  const {header, headerTip, body, footer, visible, setVisible, className} =
    props;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(visible);
  }, [visible]);

  const handleClose = () => {
    setEnabled(false);
    setVisible(false);
  };

  return (
    <>
      <div
        className={`right-modal-component ${enabled ? 'enabled' : ''} ${
          className ? className : ''
        }`}>
        <div className={`right-modal-component_header`}>
          <div className="right-modal-component_header_close shadow-sm">
            <button className="close" onClick={handleClose}>
              ×
            </button>
          </div>
          <div className="right-modal-component_header_title">
            {header || 'Your Cart'}
          </div>
          <div className="right-modal-component_header_details">
            {headerTip || ''}
          </div>
        </div>
        <div className={`right-modal-component_content`}>
          <div className={`right-modal-component_content_wrapper`}>
            {body || ''}
          </div>
          <div className={`right-modal-component_content_vertical`}>
            <div
              className={`right-modal-component_content_vertical_scrollbar`}></div>
          </div>
        </div>
        <div className={`right-modal-component_footer`}>{footer || ''}</div>
      </div>
      <div
        className={`right-modal-component_overlay ${enabled ? 'enabled' : ''}`}
        onClick={handleClose}></div>
    </>
  );
};

export default RightModal;
