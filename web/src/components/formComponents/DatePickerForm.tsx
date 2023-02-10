import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useField } from '@unform/core';
import ptBrLocale from "date-fns/locale/pt-BR";
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface Props {
  name: string;
  label?: string;
}

type DatePickerProps = Props;

const DatePickerForm: FunctionComponent<DatePickerProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { isMobile } = useResponsive();
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    registerField({
      name: fieldName,      
      getValue: () => {
        return selectedDate;
      },
      setValue: (ref: any, value: any) => {        
        setSelectedDate(new Date(value));
      },
    });
  }, [fieldName, registerField, selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
      <KeyboardDatePicker
        disableToolbar        
        inputVariant="outlined"
        error={error != null}
        helperText={error}
        size={isMobile ? 'medium' : 'small'}
        variant="dialog"
        format="dd/MM/yyyy"
        margin="none"
        id={name}
        className="input-form"
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          id: name,
          ref: inputRef,
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerForm;
