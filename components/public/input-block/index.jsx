import {Input} from 'antd';
import {useEffect} from 'react';
import {useState} from 'react';
import {debounce} from '../../../helpers/common';

const func = debounce((method) => method(), 500);

const InputBlock = (props) => {
  const {onChange} = props;
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange && func(() => onChange(e));
      }}
    />
  );
};

export default InputBlock;
