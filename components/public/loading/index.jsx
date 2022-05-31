import {Spinner} from 'reactstrap';

const Loading = (props) => {
  const {isLoading} = props;
  return (
    <div className={`loading-component ${isLoading ? 'loading' : ''}`}>
      <div className={`loading-component_spin`}>
        <Spinner
          color="success"
          style={{width: '3rem', height: '3rem', margin: 'auto'}}
        />
      </div>
      <div className={`loading-component_blur`}>{props.children}</div>
    </div>
  );
};

export default Loading;
