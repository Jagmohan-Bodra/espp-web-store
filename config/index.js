export const localeDatePicker = {
  lang: {
    locale: 'en_US',
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: 'Ok',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: 'Select time',
    dateSelect: 'Select date',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormatDefault: 'MM/DD/YYYY HH:mm:ss',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
  dateTimesFormat: 'DD-MM-YYYY HH:mm',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};

export const META_DATA = {
  PAGINATION: {
    PAGE_SIZE: 12,
    PAGE_SIZE_NONE: 10000,
  },
};

export const getAccessToken = () => process.env.WIOOH_API__TOKEN;
export const setAccessToken = (token) => {
  process.env.WIOOH_API__TOKEN = token;
};

export default {
  API_URL: process.env.NEXT_PUBLIC_API_HOST,
  HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME,
  TENANT_ID: process.env.NEXT_PUBLIC_TENANT_ID,
  // ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  RE_CAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_RE_CAPTCHA_SITEKEY,
  LOGIN_EMAIL: process.env.NEXT_PUBLIC__USER,
  LOGIN_PASSWORD: process.env.NEXT_PUBLIC__PASS,
};
