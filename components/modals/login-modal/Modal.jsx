import Router from 'next/router';
import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader} from 'reactstrap';
import SignIn from '~/components/pages/auth/sign-in';
import SignUpAccount from '~/components/pages/auth/sign-up/sign-up-account';
import SignUpInfo from '~/components/pages/auth/sign-up/sign-up-info';

const ModalComponent = (props) => {
  const [visible, setVisible] = useState(props.visible || false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [step, setStep] = useState('STEP_1');

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleClose = () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
  };

  const onFinish = async () => {
    props.setVisible && props.setVisible(false);
    setVisible(false);
    Router.reload();
  };

  const closeBtn = (
    <button className="close" onClick={handleClose}>
      &times;
    </button>
  );

  const loginClick = () => {
    setIsSignIn(true);
  };

  const signUpClick = () => {
    handleClose();
    Router.push({pathname: '/auth/sign-up'});
  };

  return (
    <Modal
      unmountOnClose={true}
      isOpen={visible}
      toggle={setVisible}
      centered={true}
      size={props.width ? props.width : '700px'}>
      <ModalHeader toggle={setVisible} close={closeBtn}>
        <b>{props.header || ''}</b>
      </ModalHeader>
      {isSignIn && (
        <SignIn
          isModal
          loginClick={loginClick}
          signUpClick={signUpClick}
          onFinish={onFinish}
        />
      )}
      {!isSignIn && (
        <div>
          {step === 'STEP_1' && (
            <SignUpAccount
              setStep={setStep}
              isModal
              loginClick={loginClick}
              signUpClick={signUpClick}
            />
          )}
          {step === 'STEP_2' && (
            <SignUpInfo
              setStep={() => setStep('STEP_1')}
              isModal
              loginClick={loginClick}
              signUpClick={signUpClick}
            />
          )}
        </div>
      )}
    </Modal>

    // <Modal
    //   title={
    //     view ? (
    //       <h4 style={{textAlign: 'center'}}>
    //         <b>SIGN IN</b>
    //       </h4>
    //     ) : (
    //       <h4 style={{textAlign: 'center'}}>
    //         <b>FORGOT YOUR PASSWORD?</b>
    //       </h4>
    //     )
    //   }
    //   visible={visible}
    //   closable={props.closable || false}
    //   onCancel={() => {
    //     setVisible(false);
    //     props.setVisible && props.setVisible(false);
    //   }}
    //   footer={null}
    //   {...props}>
    //   {view && (
    //     <div>
    //       <Form
    //         name="basic"
    //         initialValues={{remember: true}}
    //         fields={fields}
    //         onFinish={onFinish}>
    //         <Row>
    //           <Col span={24}>
    //             <Form.Item name="Email" rules={[{required: true}]}>
    //               <span>Email address *</span>
    //               <Input
    //                 placeholder="Please enter your email"
    //                 className={styles.inputForm}
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 prefix={<Icon component={UserIcon} />}
    //               />
    //             </Form.Item>
    //           </Col>
    //           <Col span={24}>
    //             <Form.Item name="Password" rules={[{required: true}]}>
    //               <span>Password *</span>
    //               <Input.Password
    //                 placeholder="Please enter your password"
    //                 className={styles.inputForm}
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 prefix={<Icon component={LockIcon} />}
    //               />
    //             </Form.Item>
    //           </Col>
    //           <div className={styles.boxBtnLink}>
    //             <Button
    //               onClick={handleChangeView}
    //               className={styles.btnLink}
    //               type="link">
    //               Forgot Your Password?
    //             </Button>
    //           </div>
    //           <ButtonBlue
    //             stylescustum={styles.btnSignIn}
    //             text="SIGN IN"
    //             htmlType="submit"
    //             block
    //           />

    //           <i>
    //             {`Don't have an account?`}
    //             <span onClick={handleClose}>
    //               <Link href="/sign-up">Create one</Link>
    //             </span>
    //           </i>
    //         </Row>
    //       </Form>
    //     </div>
    //   )}
    //   {!view && (
    //     <div>
    //       <Row>
    //         <Col span={24}>
    //           <Form.Item name="Email" rules={[{required: true}]}>
    //             <span>Email address *</span>
    //             <Input
    //               placeholder="Please enter the email your registered to ESPP"
    //               className={styles.inputForm}
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               prefix={<Icon component={UserIcon} />}
    //             />
    //           </Form.Item>
    //         </Col>

    //         <ButtonBlue
    //           stylescustum={styles.btnSignIn}
    //           text="SEND"
    //           onClick={handleForgotPassword}
    //         />

    //         <div className={styles.boxBtnLink}>
    //           <Button onClick={() => setView(true)} type="link">
    //             Back to login
    //           </Button>
    //         </div>
    //       </Row>
    //       {/* {props.body} */}
    //       {/* {props.bodycomponent && <props.bodycomponent data={data} setData={(data) => setData(data)} />} */}
    //     </div>
    //   )}
    // </Modal>
  );
};

export default ModalComponent;
