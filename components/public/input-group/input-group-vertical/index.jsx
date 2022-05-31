import {Label, Input} from 'reactstrap';

const InputGroupVertical = (props) => {
  const {label} = props;
  return (
    <div className={`input-group-vertical`}>
      <Label className={`input-group-vertical_label`}> {label} </Label>
      <Input
        {...props}
        className={`input-group-vertical_input ${props.className || ''}`}
      />
    </div>
  );
};

export default InputGroupVertical;
