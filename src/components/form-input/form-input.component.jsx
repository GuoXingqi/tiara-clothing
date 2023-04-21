import { Group, Input, FormInputLabel } from './form-input.styles';

const FormInput = ( {label, ...otherProps} ) => {
  return (
    <Group>
      <Input {...otherProps} />
      { label && (
        //if length is 0, it will be a false boolean
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
       )
      }
    </Group>
  );
}

export default FormInput;