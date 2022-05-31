export const APPROVAL_TYPES = {
  CHANGE_PROFILE: 'CHANGE_PROFILE',
  REGISTER_ACCOUNT: 'REGISTER_ACCOUNT',
  REGISTER_CLASS: 'REGISTER_CLASS',
};

export const APPROVAL_STATUS = {
  WAITING_TO_REVIEW: 'WAITING_TO_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const APPROVAL_ACTIONS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const CUSTOMER_ADDRESS_TYPE = {
  HOME: 'HOME',
  OFFICE: 'OFFICE',
};

export const ORDERS_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  READY_TO_SHIP: 'READY_TO_SHIP',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const ORDERS_STATUS_OPTION = [
  {key: 'PENDING', value: 'Pending'},
  {key: 'PROCESSING', value: 'Processing'},
  {key: 'READY_TO_SHIP', value: 'Ready to Ship'},
  {key: 'COMPLETED', value: 'Completed'},
  {key: 'CANCELLED', value: 'Cancelled'},
];

export const SALUTATION = {
  MR: 'MR',
  MRS: 'MRS',
  MS: 'MS',
  MDM: 'MDM',
  DR: 'DR',
};

export const SALUTATION_OPTION = [
  {value: '', text: 'Salutation'},
  {value: 'MR', text: 'Mr'},
  {value: 'MS', text: 'Ms'},
  {value: 'MRS', text: 'Mrs'},
  {value: 'DR', text: 'Dr'},
];

export const ACCOUNT_TYPE = {
  PERSONAL: 'Personal',
  CORPORATE: 'Corporate',
};

export const SIGN_UP_SCREENS = {
  CHOOSE_ACCOUNT_TYPE: 'CHOOSE_ACCOUNT_TYPE',
  ACCOUNT_TYPE_PERSONAL: 'ACCOUNT_TYPE_PERSONAL',
  ACCOUNT_TYPE_CORPORATE: 'ACCOUNT_TYPE_CORPORATE',
  ACCOUNT_TYPE_CORPORATE_INFO: 'ACCOUNT_TYPE_CORPORATE_INFO',
};
export const CURRENCY_COUNTRIES = [
  {
    value: 'sg',
    text: 'Singapore Dollar (SGD)',
  },
  {
    value: 'us',
    text: 'United States Dollar (USD)',
  },
];

export const SETTING_KEY = {
  GENERAL_SHOP_NAME: 'GENERAL_SHOP_NAME',
  GENERAL_SHOP_ADDRESS: 'GENERAL_SHOP_ADDRESS',
  CURRENCY_SETTING: 'CURRENCY_SETTING',
  PAYMENT_SETTING: 'PAYMENT_SETTING',
  MINIMUM_DELIVERY_VALUE: 'MINIMUM_DELIVERY_VALUE',
  INVENTORY_SETTING: 'INVENTORY_SETTING',
  EMAIL_PROVIDER_APPRAISER_LIST: 'EMAIL_PROVIDER_APPRAISER_LIST',
  EMAIL_PROVIDER_NOTIFICATION_ORDER_EVENT:
    'EMAIL_PROVIDER_NOTIFICATION_ORDER_EVENT',
  EMAIL_PROVIDER_NOTIFICATION_CONTACT_EVENT:
    'EMAIL_PROVIDER_NOTIFICATION_CONTACT_EVENT',
  EMAIL_PROVIDER_MAILER_HOST: 'EMAIL_PROVIDER_MAILER_HOST',
  EMAIL_PROVIDER_MAILER_PORT: 'EMAIL_PROVIDER_MAILER_PORT',
  EMAIL_PROVIDER_MAILER_PUBLIC_NAME: 'EMAIL_PROVIDER_MAILER_PUBLIC_NAME',
  EMAIL_PROVIDER_MAILER_SENDER_NAME: 'EMAIL_PROVIDER_MAILER_SENDER_NAME',
  EMAIL_PROVIDER_MAILER_USERNAME: 'EMAIL_PROVIDER_MAILER_USERNAME',
  EMAIL_PROVIDER_MAILER_PASSWORD: 'EMAIL_PROVIDER_MAILER_PASSWORD',
  EMAIL_TEMPLATE_REGISTER_ACCOUNT_TITLE:
    'EMAIL_TEMPLATE_REGISTER_ACCOUNT_TITLE',
  EMAIL_TEMPLATE_REGISTER_ACCOUNT_TEMPLATE:
    'EMAIL_TEMPLATE_REGISTER_ACCOUNT_TEMPLATE',
  EMAIL_TEMPLATE_FORGOT_PASSWORD_TITLE: 'EMAIL_TEMPLATE_FORGOT_PASSWORD_TITLE',
  EMAIL_TEMPLATE_FORGOT_PASSWORD_TEMPLATE:
    'EMAIL_TEMPLATE_FORGOT_PASSWORD_TEMPLATE',
  EMAIL_TEMPLATE_INVOICE_TITLE: 'EMAIL_TEMPLATE_INVOICE_TITLE',
  EMAIL_TEMPLATE_INVOICE_TEMPLATE: 'EMAIL_TEMPLATE_INVOICE_TEMPLATE',
  EMAIL_TEMPLATE_RECEIPT_TITLE: 'EMAIL_TEMPLATE_RECEIPT_TITLE',
  EMAIL_TEMPLATE_RECEIPT_ACCOUNT_TEMPLATE:
    'EMAIL_TEMPLATE_RECEIPT_ACCOUNT_TEMPLATE',
  EMAIL_TEMPLATE_SHIPPING_DETAIL_TITLE: 'EMAIL_TEMPLATE_SHIPPING_DETAIL_TITLE',
  EMAIL_TEMPLATE_SHIPPING_DETAIL_TEMPLATE:
    'EMAIL_TEMPLATE_SHIPPING_DETAIL_TEMPLATE',
};

export const PAYMENT_OPTION = {
  LOCAL_BANK_TRANSFER: 'LOCAL_BANK_TRANSFER',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  PAYNOW: 'PAYNOW',
  PAYPAL: 'PAYPAL',
};

export const PAYMENT_STATUS = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
  PROCESSING: 'PROCESSING',
};

export const DESIGNATIONS = [
  {value: '', text: 'Select...'},
  {
    value: 'Chief Executive Officer (CEO)',
    text: 'Chief Executive Officer (CEO)',
  },
  {
    value: 'Chief Technology Officer (CTO)',
    text: 'Chief Technology Officer (CTO)',
  },
  {
    value: 'Chief Production Officer (CPO)',
    text: 'Chief Production Officer (CPO)',
  },
  {value: 'Senior General Manager', text: 'Senior General Manager'},
  {value: 'General Manager', text: 'General Manager'},
  {value: 'Deputy General Manager', text: 'Deputy General Manager'},
  {value: 'Assistant General Manager', text: 'Assistant General Manager'},
  {value: 'Senior Manager', text: 'Senior Manager'},
  {value: 'Manager', text: 'Manager'},
  {value: 'Deputy Manager', text: 'Deputy Manager'},
  {value: 'Assistant Manager', text: 'Assistant Manager'},
  {value: 'Senior Engineer', text: 'Senior Engineer'},
  {value: 'Project manager', text: 'Project manager'},
  {value: 'Accountant', text: 'Accountant'},
  {value: 'HR', text: 'HR'},
  {value: 'Assistant HR', text: 'Assistant HR'},
  {value: 'Clerk', text: 'Clerk'},
  {value: 'Sales Manager', text: 'Sales Manager'},
  {value: 'Marketing Manager', text: 'Marketing Manager'},
  {value: 'Driver', text: 'Driver'},
  {value: 'Did not mention', text: 'Did not mention'},
];
