import NumberFormat from 'react-number-format';

const FormatNumberText = (props) => {
  return (
    <NumberFormat
      {...props}
      displayType={'text'}
      prefix={'$'}
      decimalSeparator={'.'}
      thousandSeparator={true}
    />
  );
};

export default FormatNumberText;
