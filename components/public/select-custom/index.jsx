const SelectCustom = (props) => {
  const {label} = props;
  return (
    <label
      className={`select-custom-component ${
        props.className ? props.className : ''
      }`}>
      {label}
      <input
        type="radio"
        {...props}
        className={`select-custom-component_input ${
          props.className ? props.className : ''
        }`}
      />
      <span className="select-custom-component_checkmark"></span>
    </label>
  );
};

export default SelectCustom;
