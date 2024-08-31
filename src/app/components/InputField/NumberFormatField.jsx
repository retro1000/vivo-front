import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';

function NumberFormatField({ textFieldProps, allowNegative, decimalScale, fixedDecimalScale, ...rest }){
console.log({...rest})
    return (
        <NumericFormat
          customInput={TextField}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={allowNegative}
          inputProps={textFieldProps}
          {...rest}
        />
      );
}

export default NumberFormatField;
