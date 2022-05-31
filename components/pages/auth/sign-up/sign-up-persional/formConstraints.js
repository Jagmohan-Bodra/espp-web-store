export default {
  firstName: {
    presence: {
      allowEmpty: false,
      message: 'First Name is required',
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: 'Last Name is required',
    },
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: 'Contact Number is required',
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: 'Email is required. ',
    },
    email: {
      message: 'Email is not a valid!',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'Password is required. ',
    },
    length: {
      minimum: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: 'Confirm password is required. ',
    },
    equality: {
      attribute: 'password',
      message: 'The two passwords that you entered do not match!',
    },
  },
  captcha: {
    presence: {
      allowEmpty: false,
      message: 'ReCAPTCHA is required',
    },
  },
};
