import { Box } from '@chakra-ui/react';

type ISpinner = {
	uploadStatus: boolean;
};

export const Spinner: React.FC<ISpinner> = ({ uploadStatus }) => (
	<Box style={{ display: uploadStatus ? 'flex' : 'none' }} className='modal'>
		<Box className='modal-content'>
			<Box className='loader'></Box>
			<Box className='modal-text'>Loading...</Box>
		</Box>
	</Box>
);
