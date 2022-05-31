const Star = (props) => {
  return (
    <span style={{color: 'red', display: props.none ? 'none' : 'inline'}}>
      *
    </span>
  );
};

export default Star;
