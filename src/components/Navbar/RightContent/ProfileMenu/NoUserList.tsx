import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineLogin } from 'react-icons/md';

export const NoUserList: React.FC = () => (
	<>
		<MenuItem
			fontSize='10pt'
			fontWeight={700}
			_hover={{ bg: 'blue.500', color: 'white' }}
		>
			<Flex alignItems='center'>
				<Icon fontSize={20} mr={2} as={MdOutlineLogin} />
				Log In / Sign Up
			</Flex>
		</MenuItem>
	</>
);
