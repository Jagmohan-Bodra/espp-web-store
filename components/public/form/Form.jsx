import {Form as FormB} from 'reactstrap';
const emailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const RULE_OPTION = {
  required: {
    isValid: (value) => value === '' || value === undefined,
    message: ':name is a required field',
  },
  email: {
    isValid: (value) => !emailValidator.test(value),
    message: ':name should be an email field',
  },
};

const Form = (props) => {
  const {data, rules, setError, onFinish} = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errMessage = {};
    Object.keys(rules).map((key) => {
      const rule = rules[key];
      (rule || []).forEach((element) => {
        if (typeof element === 'function') {
          if (element(data[key])) {
            errMessage[key] = element(data[key]);
          }
        }
        if (
          typeof element === 'string' &&
          RULE_OPTION[element] &&
          RULE_OPTION[element].isValid(data[key])
        ) {
          errMessage[key] = RULE_OPTION[element].message;
        }
      });
    });

    setError(errMessage);
    if (Object.keys(errMessage).length === 0) {
      onFinish(data);
    }
  };

  return <FormB onSubmit={handleSubmit}>{props.children}</FormB>;
};

Form.defaultProps = {
  data: {},
  rules: {},
  setError: () => {},
  onFinish: () => {},
};

export default Form;
