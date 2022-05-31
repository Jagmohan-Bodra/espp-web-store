import FormGroupRow from './FormGroupRow';
import Select from '../select-bootstrap';

const SelectRow = (props) => {
  const {name, id, value, onChange, remains, feedback, important, data} = props;

  return (
    <FormGroupRow
      name={name}
      id={id}
      remains={remains}
      feedback={feedback}
      important={important}>
      <Select
        data={data}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        // valid={isShow ? valid : false}
        invalid={!!feedback}
      />
    </FormGroupRow>
  );
};

SelectRow.defaultProps = {
  name: '',
  id: undefined,
  value: '',
  onChange: () => {},
  isValid: () => {},
};

export default SelectRow;
