/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({
  name,
  icon: Icon,
  placeholder,
  options,
  ...rest
}) => {
  const selectRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [valueSelect, setValueSelect] = useState(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    const value = selectRef.current?.state.value?.value;
    setIsFilled(!!value);
  }, []);

  const handleChange = useCallback((option: any) => {
    if (option.value) setValueSelect(option.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value: any) => {
        ref.select?.setValue(value);
        if (Array.isArray(value) && value != null) {
          const newValue = [...value];
          setValueSelect(newValue?.shift()?.value);
        }
      },
      getValue: () => valueSelect,
    });
  }, [fieldName, registerField, valueSelect]);

  return (
    <Container isErrorRed={!!error} isFocused={isFocused} isFilled={isFilled}>
      <label htmlFor={name}>{placeholder}</label>
      {Icon && <Icon size={20} />}
      <ReactSelect
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={selectRef}
        options={options}
        classNamePrefix="react-select"
        value={options?.find(f => f.value === valueSelect)}
        onChange={handleChange}
        placeholder={!(isFilled || isFocused) ? 'Selecione' : ''}
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

export default Select;
