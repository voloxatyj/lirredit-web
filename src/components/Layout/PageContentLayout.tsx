import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NavigationSidebar from '../Sidebar/NavigationSidebar';
import UsersSidebar from '../Sidebar/UsersSidebar';

export type PageContentLayoutVariant = 'small' | 'regular';

interface IPageContentLayoutProps {
	variant?: PageContentLayoutVariant;
	children: JSX.Element;
}

export const PageContentLayout: React.FC<IPageContentLayoutProps> = ({
	children,
	variant = 'regular',
}) => {
	return (
		<Flex>
			<NavigationSidebar pageProps={null} />
			<Box
				mt={8}
				mx='auto'
				maxW={variant === 'regular' ? '900px' : '400px'}
				w='100%'
			>
				{children}
			</Box>
			<UsersSidebar pageProps={null} />
		</Flex>
	);
};
