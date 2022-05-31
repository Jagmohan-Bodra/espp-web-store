import {Input} from 'reactstrap';
import FormGroupOnlyRow from './FormGroupOnlyRow';

const TextareaOnlyRow = (props) => {
  const {name, id, value, onChange, remains, feedback} = props;

  return (
    <FormGroupOnlyRow name={name} remains={remains} feedback={feedback}>
      <Input
        type="textarea"
        rows={6}
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // valid={isShow ? valid : false}
        invalid={!!feedback}
        placeholder={name}
      />
    </FormGroupOnlyRow>
  );
};

TextareaOnlyRow.defaultProps = {
  name: '',
  id: undefined,
  value: '',
  onChange: () => {},
  isValid: () => {},
};

export default TextareaOnlyRow;
