import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NavigationSidebar from '../Sidebar/NavigationSidebar';

interface IPostContentLayoutProps {
	children: JSX.Element;
}

export const PostContentLayoutVariant: React.FC<IPostContentLayoutProps> = ({
	children,
}) => {
	return (
		<Flex>
			<NavigationSidebar pageProps={null} size='sm' />
			<Box mx='auto' minW={'800px'} mt={8}>
				{children}
			</Box>
		</Flex>
	);
};
