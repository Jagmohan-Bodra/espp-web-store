import Router from 'next/router';
const HeaderAuth = (props) => {
  const {signIn, signUp, isModal, loginClick, signUpClick} = props;
  const handleLoginClick = () => {
    if (isModal) {
      return loginClick();
    }
    Router.push({pathname: '/auth/sign-in'});
  };

  const handleSignUpClick = () => {
    if (isModal) {
      return signUpClick();
    }
    Router.push({pathname: '/auth/sign-up'});
  };

  return (
    <div className={`header-auth_container`}>
      <div className={`header-auth_container_header`}>
        <h2
          className={`header-auth_container_header_title`}
          style={{
            fontWeight: signIn ? 600 : 300,
            paddingLeft: signIn ? 25 : 28,
          }}
          onClick={handleLoginClick}>
          LOGIN
        </h2>
        <div className={`header-auth_container_header_content`} />
        <h2
          className={`header-auth_container_header_title`}
          style={{fontWeight: signUp ? 600 : 300}}
          onClick={handleSignUpClick}>
          SIGN UP
        </h2>
      </div>
    </div>
  );
};

HeaderAuth.defaultProps = {
  signIn: false,
  signUp: false,
  isModal: false,
  loginClick: () => {},
  signUpClick: () => {},
};

export default HeaderAuth;
