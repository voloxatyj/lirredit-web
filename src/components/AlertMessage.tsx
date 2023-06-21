import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export type AlertMessageVariant = 'error' | 'success' | 'warning' | 'info';

interface IAlertMessageVariant {
	variant?: AlertMessageVariant;
	message: string;
}

export const AlertMessage: React.FC<IAlertMessageVariant> = ({
	variant = 'error',
	message,
}) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timeId = setTimeout(() => {
			setShow(false);
		}, 3000);

		return () => {
			clearTimeout(timeId);
		};
	}, []);

	const renderAlert = () => {
		switch (variant) {
			case 'error':
				return (
					<Box
						display={show ? 'flex' : 'none'}
						justifyContent='center'
						pos='absolute'
						bottom='22%'
						right='3%'
						zIndex={5}
					>
						<Alert
							status='error'
							variant='subtle'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							textAlign='center'
							height='150px'
							width='300px'
							borderRadius={10}
						>
							<AlertIcon boxSize='40px' />
							<AlertTitle mt={4} mb={1} fontSize='lg'>
								Houston we got a problem!
							</AlertTitle>
							<AlertDescription maxWidth='sm'>{message}</AlertDescription>
						</Alert>
					</Box>
				);
			case 'success':
				return (
					<Alert status='success'>
						<AlertIcon />
						{message}
					</Alert>
				);
			case 'warning':
				return (
					<Alert status='warning'>
						<AlertIcon />
						{message}
					</Alert>
				);
			case 'info':
				return (
					<Alert status='info'>
						<AlertIcon />
						{message}
					</Alert>
				);
			default:
				return null;
		}
	};

	return <Stack spacing={3}>{renderAlert()}</Stack>;
};
