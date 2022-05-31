import {Select} from 'antd';
const {Option} = Select;

export const SelectForm = (props) => {
  const {data, value, onChange} = props;
  return (
    <Select
      {...props}
      size={props.size || 'large'}
      style={props.style || {width: '100%'}}
      onChange={onChange || undefined}
      value={value || ''}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      {(data || []).map((item, index) => (
        <Option key={index} value={item.value}>
          {item.title || '_'}
        </Option>
      ))}
    </Select>
  );
};
