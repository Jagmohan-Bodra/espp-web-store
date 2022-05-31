import {Label, Input, FormFeedback} from 'reactstrap';

const InputGroupHorizontal = (props) => {
  const {label, feedback} = props;
  return (
    <div className={`input-group-horizontal ${feedback ? 'invalid' : ''}`}>
      <Label className={`input-group-horizontal_label`}> {label} </Label>
      <Input
        {...props}
        className={`input-group-horizontal_input ${props.className || ''}`}>
        {props.children}
      </Input>
      <FormFeedback>{(feedback || '').replace(':name', label)}</FormFeedback>
    </div>
  );
};

export default InputGroupHorizontal;
