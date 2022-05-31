import React from 'react';
import {Select} from 'antd';
import styles from './styles.module.scss';
const {Option} = Select;

const SelectBlock = (props) => {
  const {data, style, placeholder, size, value, disabled, bordered} = props;

  const onChange = (e) => {
    props.onChange && props.onChange(e);
  };

  return (
    <Select
      size={size || 'large'}
      placeholder={placeholder || 'Please select...'}
      onChange={onChange || undefined}
      value={value || ''}
      showSearch
      disabled={disabled}
      bordered={bordered}
      style={style ? style : {width: '100%', marginLeft: '10px'}}
      // optionFilterProp="children"
      // filterOption={(input, option) =>
      //     option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      // }
    >
      <Option value="">
        <span className={styles.option}>
          {placeholder || 'Please select...'}
        </span>
      </Option>
      {(data || []).map((item, index) => (
        <Option key={index} value={item.key || item._id}>
          {item.name || item.value || '_'}
        </Option>
      ))}
    </Select>
  );
};

export default SelectBlock;
