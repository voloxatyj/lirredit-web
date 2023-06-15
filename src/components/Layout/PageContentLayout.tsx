import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NavigationSidebar } from '../Sidebar/NavigationSidebar';

export type PageContentLayoutVariant = 'small' | 'regular';

interface PageContentLayoutProps {
	variant?: PageContentLayoutVariant;
	children: JSX.Element;
}

export const PageContentLayout: React.FC<PageContentLayoutProps> = ({
	children,
	variant = 'regular',
}) => {
	return (
		<Flex>
			<NavigationSidebar />
			<Box
				mt={8}
				mx='auto'
				maxW={variant === 'regular' ? '800px' : '400px'}
				w='100%'
			>
				{children}
			</Box>
		</Flex>
	);
};
