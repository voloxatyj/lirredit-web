import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
	textarea?: boolean;
	styles?: object;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	size: _,
	styles,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel {...styles} fontSize={'2xl'} pl={2} htmlFor={field.name}>
				{label}
			</FormLabel>
			{textarea ? (
				<Textarea {...field} {...styles} id={field.name} />
			) : (
				<Input {...field} {...props} id={field.name} />
			)}
			{error ? (
				<FormErrorMessage pl={2} fontSize={'md'}>
					<InfoIcon mr={1} />
					{error}
				</FormErrorMessage>
			) : null}
		</FormControl>
	);
};
