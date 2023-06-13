import { Flex, Icon, MenuDivider, MenuItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { useLogOutMutation } from '../../../../graphql/generated/graphql';

export const UserList: React.FC = () => {
	const [, logout] = useLogOutMutation();
	const router = useRouter();
	return (
		<>
			<MenuItem
				fontSize='10pt'
				fontWeight={700}
				_hover={{ bg: 'blue.500', color: 'white' }}
			>
				<Flex alignItems='center'>
					<Icon fontSize={20} mr={2} as={CgProfile} />
					Profile
				</Flex>
			</MenuItem>
			<MenuDivider />
			<MenuItem
				fontSize='10pt'
				fontWeight={700}
				_hover={{ bg: 'blue.500', color: 'white' }}
				onClick={() => {
					logout({});
					router.push('/');
				}}
			>
				<Flex alignItems='center'>
					<Icon fontSize={20} mr={2} as={MdOutlineLogin} />
					Log Out
				</Flex>
			</MenuItem>
		</>
	);
};
