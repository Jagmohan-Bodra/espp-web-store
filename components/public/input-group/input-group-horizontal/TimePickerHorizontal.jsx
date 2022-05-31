import {Label, FormFeedback} from 'reactstrap';
import DatePicker from 'react-datepicker';

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
const years = range(100, new Date().getFullYear() - 100);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const TimePickerHorizontal = (props) => {
  const {label, feedback} = props;
  return (
    <div className={`input-group-horizontal ${feedback ? 'invalid' : ''}`}>
      <Label className={`input-group-horizontal_label`}> {label} </Label>

      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select
              value={date.getFullYear()}
              onChange={({target: {value}}) => changeYear(value)}>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[date.getMonth()]}
              onChange={({target: {value}}) =>
                changeMonth(months.indexOf(value))
              }>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        {...props}
        className={`input-group-horizontal_input ${props.className || ''}`}>
        {props.children}
      </DatePicker>
      <FormFeedback>{(feedback || '').replace(':name', label)}</FormFeedback>
    </div>
  );
};

export default TimePickerHorizontal;
