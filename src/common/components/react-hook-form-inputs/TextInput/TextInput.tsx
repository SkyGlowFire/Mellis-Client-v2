import { useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FC } from 'react';

export interface TextInputProps
  extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
  name: `${string}` | `${string}.${string}` | `${string}.${number}`;
}

const TextInput: FC<TextInputProps> = (props) => {
  const { name, className, variant, InputLabelProps, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      InputLabelProps={{ ...InputLabelProps, style: { fontSize: '.8rem' } }}
      {...rest}
      variant={variant as any}
      {...register(name)}
      className={className}
      helperText={errors[name] ? errors[name].message : null}
      error={!!errors[name]?.message}
    />
  );
};

export default TextInput;
