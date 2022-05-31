export default {
  email: {
    presence: {
      allowEmpty: false,
      message: 'Username is required',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'Password is required',
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: 'Confirm password is required',
    },
  },
  checkPassword: {
    presence: {
      allowEmpty: false,
      message: 'Password and Confirm password must be the same',
    },
  },
};
