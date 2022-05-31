import {Input} from 'reactstrap';

const Select = (props) => {
  const {data, value, onChange} = props;
  return (
    <Input
      type="select"
      {...props}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}>
      {(data || []).map((option, index) => (
        <option value={option.value} key={index}>
          {option.text}
        </option>
      ))}
    </Input>
  );
};

export default Select;
