import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const InputArea = Input;

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color={'white'} fontSize={'2xl'} pl={2} htmlFor={field.name}>
        {label}
      </FormLabel>
      <InputArea {...field} {...props} id={field.name} />
      {error ? (
        <FormErrorMessage pl={2} fontSize={'md'}>
          <InfoIcon mr={1} />
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
