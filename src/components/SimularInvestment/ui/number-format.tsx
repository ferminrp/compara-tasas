import { NumericFormat, type NumericFormatProps } from 'react-number-format';

export default function NumberFormat(props: NumericFormatProps) {
  return (
    <NumericFormat
      prefix='$'
      decimalSeparator=','
      thousandSeparator='.'
      allowNegative={false}
      allowLeadingZeros={false}
      decimalScale={2}
      {...props}
    />
  );
}
