export const SALUTATION_OPTION = [
  {
    value: '',
    title: '- Please select -',
  },
  {
    value: 'Mr',
    title: 'Mr',
  },
  {
    value: 'Mrs',
    title: 'Mrs',
  },
  {
    value: 'Mrs',
    title: 'Mrs',
  },
  {
    value: 'Ms',
    title: 'Ms',
  },
  {
    value: 'Mdm',
    title: 'Mdm',
  },
  {
    value: 'Dr',
    title: 'Dr',
  },
];

export const YEAR_OPTION = () => {
  const option = [
    {
      value: '',
      title: 'Year...',
    },
  ];
  for (var i = 2021; i > 1950; i--) {
    option.push({
      value: `${i}`,
      title: `${i}`,
    });
  }
  return option;
};

export const MONTH_OPTION = () => {
  const option = [
    {
      value: '',
      title: 'Month...',
    },
  ];
  for (var i = 1; i <= 12; i++) {
    option.push({
      value: `${i}`,
      title: `${i}`,
    });
  }
  return option;
};

export const DAY_OPTION = () => {
  const option = [
    {
      value: '',
      title: 'Day...',
    },
  ];
  for (var i = 1; i <= 31; i++) {
    option.push({
      value: `${i}`,
      title: `${i}`,
    });
  }
  return option;
};

export const NUMBER_OF_CHILDREN_OPTION = () => {
  const option = [
    {
      value: '',
      title: '- Please select -',
    },
  ];
  for (var i = 1; i <= 10; i++) {
    option.push({
      value: `${i}`,
      title: `${i} Child`,
    });
  }
  return option;
};

export const COURSE_OPTION = [
  {
    value: '',
    title: '- Please select -',
  },
  {
    value: 'P3 English Primary 3',
    title: 'P3 English Primary 3',
  },
  {
    value: 'P4 English Primary 4',
    title: 'P4 English Primary 4',
  },
  {
    value: 'P5 English Primary 5',
    title: 'P5 English Primary 5',
  },
  {
    value: 'P6 English Primary 6',
    title: 'P6 English Primary 6',
  },
];

export const LEVEL_AT_SCHOOL_OPTION = [
  {value: '', title: '- Please select -'},
  {value: 'MON 1500hrs to 1630hrs', title: 'MON 1500hrs to 1630hrs'},
  {value: 'MON 1700hrs to 1830hrs', title: 'MON 1700hrs to 1830hrs'},
  {value: 'TUE 1500hrs to 1630hrs', title: 'TUE 1500hrs to 1630hrs'},
  {value: 'TUE 1700hrs to 1830hrs', title: 'TUE 1700hrs to 1830hrs'},
  {value: 'WED 1500hrs to 1630hrs', title: 'WED 1500hrs to 1630hrs'},
  {value: 'WED 1700hrs to 1830hrs', title: 'WED 1700hrs to 1830hrs'},
  {value: 'THU 1500hrs to 1630hrs', title: 'THU 1500hrs to 1630hrs'},
  {value: 'THU 1600hrs to 1830hrs', title: 'THU 1600hrs to 1830hrs'},
  {value: 'FRI 1500hrs to 1630hrs', title: 'FRI 1500hrs to 1630hrs'},
  {value: 'FRI 1700hrs to 1830hrs', title: 'FRI 1700hrs to 1830hrs'},
  {value: 'SAT 1000hrs to 1130hrs', title: 'SAT 1000hrs to 1130hrs'},
  {value: 'SAT 1400hrs to 1530hrs', title: 'SAT 1400hrs to 1530hrs'},
  {value: 'SUN 1000hrs to 1130hrs', title: 'SUN 1000hrs to 1130hrs'},
  {value: 'SUN 1400hrs to 1530hrs', title: 'SUN 1400hrs to 1530hrs'},
];
