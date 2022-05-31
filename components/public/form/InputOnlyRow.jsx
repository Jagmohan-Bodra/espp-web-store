import {Input} from 'reactstrap';
import FormGroupOnlyRow from './FormGroupOnlyRow';

const InputOnlyRow = (props) => {
  const {name, id, value, onChange, remains, feedback, type} = props;

  return (
    <FormGroupOnlyRow name={name} remains={remains} feedback={feedback}>
      <Input
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // valid={isShow ? valid : false}
        invalid={!!feedback}
        placeholder={name}
        type={type}
      />
    </FormGroupOnlyRow>
  );
};

InputOnlyRow.defaultProps = {
  name: '',
  id: undefined,
  value: '',
  type: 'text',
  onChange: () => {},
  isValid: () => {},
};

export default InputOnlyRow;
