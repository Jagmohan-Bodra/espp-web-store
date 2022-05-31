import {useRef, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {Modal, ModalBody, FormGroup, Button, Col} from 'reactstrap';
import Form from '~/components/public/form/Form';
import InputRow from '~/components/public/form/InputRow';
import TextareaRow from '~/components/public/form/TextareaRow';
import {notif} from '~/components/public/notification/common';
import config from '~/config';
import {postEnquiry} from '~/lib/services/enquiry';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const ModalEnquiryUs = (props) => {
  const {visible, setVisible, id} = props;
  const [captcha, setCaptcha] = useState();
  const [data, setData] = useState({});
  const [err, setErr] = useState({});
  const ref = useRef(null);

  const onFinish = () => {
    postEnquiry(
      {
        ...data,
        product: id,
      },
      captcha,
    )
      .then(async () => {
        await notif({message: 'Thank you for your enquiry'});
        ref.current.reset();
        setCaptcha('');
        setVisible(false);
        setData({});
      })
      .catch(() => {
        ref.current.reset();
        setCaptcha('');
      });
  };

  function onChangereCaptcha(value) {
    setCaptcha(value);
  }

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        unmountOnClose={true}
        isOpen={visible}
        toggle={setVisible}
        centered={true}
        className={`modals-enquiry-us`}>
        <ModalBody className={`modals-enquiry-us_modal`}>
          <div
            className={`modals-enquiry-us_modal_btn_close`}
            onClick={handleClose}>
            <FontAwesomeIcon color="#999" icon={faTimes} />
          </div>
          <span className={`modals-enquiry-us_modal_header`}>
            Should you need more information on the product, kindly write your
            details to us
          </span>

          <Form
            data={{
              ...data,
              captcha,
            }}
            rules={{
              name: ['required'],
              email: ['required', 'email'],
              contact: ['required'],
              message: ['required'],
              captcha: ['required'],
            }}
            setError={setErr}
            onFinish={onFinish}>
            <InputRow
              name={`Name`}
              id={`name`}
              value={data.name}
              onChange={(value) => onChangeData({name: value})}
              feedback={err.name}
              important
              className={`modals-enquiry-us_modal_form_input`}
            />

            <InputRow
              name={`Email`}
              id={`email`}
              value={data.email}
              onChange={(value) => onChangeData({email: value})}
              feedback={err.email}
              important
              className={`modals-enquiry-us_modal_form_input`}
            />

            <InputRow
              name={`Contact No.`}
              id={`contactNo`}
              value={data.contact}
              onChange={(value) => onChangeData({contact: value})}
              feedback={err.contact}
              important
              className={`modals-enquiry-us_modal_form_input`}
            />

            <TextareaRow
              name={`Enquiry`}
              id={`enquiry`}
              value={data.message}
              onChange={(value) => onChangeData({message: value})}
              feedback={err.message}
              important
              className={`modals-enquiry-us_modal_form_input`}
            />
            <FormGroup row>
              <Col sm={3}></Col>
              <Col sm={9}>
                <ReCAPTCHA
                  ref={ref}
                  sitekey={config.RE_CAPTCHA_SITEKEY}
                  onChange={onChangereCaptcha}
                />
                <div className="invalid-feedback" style={{display: 'block'}}>
                  {(err.captcha || '').replace(':name', 'ReCAPTCHA')}
                </div>
              </Col>
            </FormGroup>

            <Button
              className={`modals-enquiry-us_modal_form_btn`}
              type="submit">
              SUBMIT
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalEnquiryUs;
