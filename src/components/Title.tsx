import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

interface ITitle {
	text: string;
	styles?: object;
}

export const Title: React.FC<ITitle> = ({ text, styles }) => {
	return (
		<Box
			display='flex'
			w='100%'
			fontSize={40}
			justifyContent='center'
			fontWeight={800}
			mb='8'
			{...styles}
		>
			<Heading>{text}</Heading>
		</Box>
	);
};
