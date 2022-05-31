import {Label, Input, FormFeedback} from 'reactstrap';

const SelectGroupHorizontal = (props) => {
  const {label, data, feedback} = props;
  return (
    <div className={`input-group-horizontal ${feedback ? 'invalid' : ''}`}>
      <Label className={`input-group-horizontal_label`}> {label} </Label>
      <Input
        {...props}
        type={`select`}
        className={`input-group-horizontal_input ${props.className || ''}`}>
        {data.map((item, index) => (
          <option value={item.value || item.id} key={index}>
            {item.text || item.name}
          </option>
        ))}
      </Input>
      <FormFeedback>{(feedback || '').replace(':name', label)}</FormFeedback>
    </div>
  );
};

export default SelectGroupHorizontal;
