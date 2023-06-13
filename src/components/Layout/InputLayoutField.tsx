import React from 'react';
import { Input } from '@chakra-ui/react';

type InputFieldProps = {
	name: string;
	placeholder: string;
	type: string;
	isRequired?: boolean;
	mb?: number;
};

export const InputLayoutField: React.FC<InputFieldProps> = ({
	name,
	placeholder,
	type,
	mb,
}) => {
	return (
		<>
			<Input
				bg='gray.50'
				name={name}
				placeholder={placeholder}
				type={type}
				mb={mb}
				fontSize='10pt'
				_placeholder={{ color: 'gray.500' }}
				_hover={{
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
			/>
		</>
	);
};
