import {Select} from 'antd';

const SelectMultiple = (props) => {
  return (
    <Select
      mode="multiple"
      value={props.value || []}
      onChange={props.onChange || undefined}
      onBlur={props.onBlur || undefined}
      focus={props.focus || undefined}
      size={props.size || 'large'}
      style={props.style || {width: '100%'}}
      placeholder={props.placeholder || 'Please select...'}
      showSearch>
      {(props.data || []).map((item, index) => (
        <Select.Option key={index} value={item._id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectMultiple;
