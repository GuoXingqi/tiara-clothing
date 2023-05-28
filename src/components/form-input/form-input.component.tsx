import { FC, InputHTMLAttributes } from 'react';
import { Group, Input, FormInputLabel } from './form-input.styles';

type FormInputProps = {label: string} & InputHTMLAttributes<HTMLInputElement>;

const FormInput:FC<FormInputProps> = ( {label, ...otherProps} ) => {
  return (
    <Group>
      <Input {...otherProps} />
      { label && (
        //if length=0, its false
        <FormInputLabel shrink={
          Boolean(otherProps && typeof otherProps.value === 'string' && otherProps.value.length)
          }>
          {label}
        </FormInputLabel>
       )
      }
    </Group>
  );
}

export default FormInput;