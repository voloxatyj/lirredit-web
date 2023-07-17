import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface IActionIcon {
	icon: IconType;
	fontSize: number;
	onClick: (() => void) | undefined;
}

export const ActionIcon: React.FC<IActionIcon> = ({
	icon,
	fontSize,
	onClick,
}) => (
	<Flex
		mr={1.5}
		ml={1.5}
		padding={1}
		cursor='pointer'
		borderRadius={4}
		color={'blue.500'}
		_hover={{ bg: 'gray.200', transform: 'translateY(-5px)' }}
		transition={'0.5s'}
	>
		<Icon as={icon} fontSize={fontSize} onClick={onClick} />
	</Flex>
);
