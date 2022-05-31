import pathRouter from '~/constants/path-router';
const clsName = 'sign-up-thank-you';

const SignUpThankYou = () => {
  return (
    <div className={`${clsName}`}>
      <div className={`${clsName}_logo`}>
        <a href={pathRouter.ROOT}>
          <img src={`/images/checked.png`} width="auto" />
        </a>
      </div>
      <div className={`${clsName}_title`}>Thanks for registering!</div>
      <div className={`${clsName}_description`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute...
      </div>
      <div className={`${clsName}_btn`}>
        <a href={pathRouter.ROOT}>
          <button className={`${clsName}_btn_shoping`}>BACK TO HOME</button>
        </a>
      </div>
    </div>
  );
};

export default SignUpThankYou;
