import { InfoIcon } from '@chakra-ui/icons';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../../graphql/generated/graphql';
import { Title } from '../Title';

interface ForgotPasswordModalProps {
	text: string;
	isOpen: boolean;
	onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
	text,
	isOpen,
	onClose,
}) => {
	const [, forgotPassword] = useForgotPasswordMutation();
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleSubmit = async (): Promise<unknown> => {
		setIsSubmitting(true);
		const response = await forgotPassword({ email });

		if (Array.isArray(response.data?.forgotPassword.errors)) {
			setIsSubmitting(false);
			return setError(
				response.data?.forgotPassword.errors[0].message as string,
			);
		}

		setIsSubmitting(false);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Title text={text} styles={{ mb: 0, mt: 5 }} />
				<ModalCloseButton mt={1} />
				<ModalBody pb={6} w={'100%'} textAlign='center'>
					<FormControl isInvalid={!!error}>
						<Input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Please type your email'
							style={{ width: '100%', border: '1px solid black' }}
						/>
						{!error ? (
							<FormHelperText>
								Enter the email you'd like to receive the newsletter on.
							</FormHelperText>
						) : (
							<FormErrorMessage pl={2} fontSize={'md'}>
								<InfoIcon mr={1} />
								{error}
							</FormErrorMessage>
						)}
					</FormControl>
				</ModalBody>

				<ModalFooter display='flex' justifyContent='center' mb={4}>
					<Button
						mr={3}
						colorScheme='blue'
						isLoading={isSubmitting}
						onClick={handleSubmit}
					>
						Send
					</Button>
					<Button
						onClick={() => {
							onClose();
							setEmail('');
							setError(null);
						}}
					>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
