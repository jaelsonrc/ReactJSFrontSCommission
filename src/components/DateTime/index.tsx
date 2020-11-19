/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import br from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

import { FiAlertCircle } from 'react-icons/fi';
// @ts-ignore
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { Container, Error } from './styles';

registerLocale('pt-BR', br);

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  placeholder?: string;
}

const DateTime: React.FC<Props> = ({
  name,
  icon: Icon,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);
  const smallDevice = window.matchMedia('(max-width: 400px)').matches;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    const value = date;
    setIsFilled(!!value);
  }, [date]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      setValue: (e, v: string | number | Date) => {
        setDate(new Date(v)); // <---- Setting up default value
      },
      clearValue: ref => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrorRed={!!error} isFocused={isFocused} isFilled={isFilled}>
      <label htmlFor={name}>{placeholder}</label>
      {Icon && <Icon size={20} />}
      <ReactDatePicker
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        locale="pt-BR"
        withPortal={smallDevice}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default DateTime;
