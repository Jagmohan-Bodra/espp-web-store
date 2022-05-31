const CheckboxCustom = (props) => {
  const {label} = props;
  return (
    <label className="checkbox-custom-component">
      {label}
      <input
        {...props}
        type="checkbox"
        className={`checkbox-custom-component_input ${
          props.className ? props.className : ''
        }`}
      />
      <span className="checkbox-custom-component_checkmark"></span>
    </label>
  );
};

export default CheckboxCustom;
