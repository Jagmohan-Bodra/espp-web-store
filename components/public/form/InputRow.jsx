import FormGroupRow from './FormGroupRow';
import {Input} from 'reactstrap';

const InputRow = (props) => {
  const {name, id, value, onChange, remains, feedback, important} = props;

  return (
    <FormGroupRow
      name={name}
      id={id}
      remains={remains}
      feedback={feedback}
      important={important}>
      <Input
        name={name}
        // id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // valid={isShow ? valid : false}
        invalid={!!feedback}
      />
    </FormGroupRow>
  );
};

InputRow.defaultProps = {
  name: '',
  id: undefined,
  value: '',
  onChange: () => {},
  isValid: () => {},
};

export default InputRow;
