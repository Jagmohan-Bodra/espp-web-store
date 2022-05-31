import pathRouter from '~/constants/path-router';
const clsName = 'page-404';

const Custom404 = () => {
  return (
    <div className={`${clsName}`}>
      <div className={`${clsName}_logo`}>
        <h1 className={`${clsName}_text404`}>404</h1>
      </div>
      <h2 className={`${clsName}_title`}>SORRY - PAGE NOT FOUND!</h2>
      <div className={`${clsName}_btn`}>
        <a href={pathRouter.ROOT}>
          <button className={`${clsName}_btn_shoping`}>BACK TO HOME</button>
        </a>
      </div>
    </div>
  );
};

export default Custom404;
