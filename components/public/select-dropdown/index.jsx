import SelectCustom from '../select-custom';
import Collapse from '../collapse';
import {useEffect, useState} from 'react';

const SelectDropdown = (props) => {
  const {data, name, value, setValue} = props;
  const [selected, setSelected] = useState('');
  useEffect(() => {
    value && setSelected(value);
  }, [value]);

  return (
    <div className={`select-dropdown-component`}>
      {data.map((item, index) => (
        <div key={index} className={`select-dropdown-component_collap`}>
          <div
            className={`select-dropdown-component_collap_header ${
              item.value == selected ? 'actice' : ''
            }`}
            onClick={() => {
              setSelected(item.value);
              setValue(item.value);
            }}>
            <SelectCustom
              label={item.label}
              name={name}
              value={item.value}
              checked={item.value == selected}
            />
            <div>{item.right || ''}</div>
          </div>
          <Collapse
            isOpen={item.value == selected}
            className={`select-dropdown-component_collap_body`}>
            <div className={`select-dropdown-component_collap_body_content`}>
              {item.body}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

SelectDropdown.defaultProps = {
  data: [],
  name: 'name',
};
export default SelectDropdown;
