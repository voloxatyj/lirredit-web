import React from 'react';
import { IconType } from 'react-icons';
import { Flex, Icon, Text } from '@chakra-ui/react';

interface INotificationIcon {
	icon: IconType;
	fontSize: number;
	count: number;
	onClick: () => void;
}

export const NotificationIcon: React.FC<INotificationIcon> = ({
	icon,
	fontSize,
	count,
}) => {
	return (
		<Flex
			p={3}
			pl={1}
			alignItems={'center'}
			justifyContent={'space-evenly'}
			borderRadius={8}
			m={'0 10px'}
			w={'10%'}
			cursor='pointer'
		>
			<Icon color={'#3182ce'} as={icon} />
			<Text color={'blue.500'} fontSize={fontSize}>
				{count}
			</Text>
		</Flex>
	);
};
