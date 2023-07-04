import { useState } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { isServer } from '../../utils/isServer';
import { useFindUsersQuery } from '../../graphql/generated/graphql';
import { withUrqlClient } from 'next-urql';
import { urqlClient } from '../../utils/urqlClient';
import { UserItem } from './UserItem';

const UsersSidebar = () => {
	const [{ data }] = useFindUsersQuery({
		pause: isServer(),
	});
	const [navSize, setNavSize] = useState<'sm' | 'lg'>('lg');

	return (
		<Flex
			pos='sticky'
			right='5'
			h='90vh'
			marginTop='2.5vh'
			background='whiteAlpha.600'
			boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
			borderRadius={navSize === 'sm' ? '15px' : '30px'}
			w={navSize === 'sm' ? '75px' : '220px'}
			flexDir='column'
			justifyContent='space-between'
		>
			<Flex
				p='5%'
				justifyContent='center'
				flexDir='column'
				alignItems='flex-end'
				as='nav'
			>
				<Box
					display='flex'
					justifyContent='center'
					w={navSize === 'lg' ? '20%' : '100%'}
				>
					<Icon
						background='none'
						color={navSize === 'sm' ? 'white' : '#1A202C'}
						boxSize={8}
						cursor='pointer'
						mt='5'
						_hover={{ backround: 'none' }}
						as={FiMenu}
						onClick={() => {
							if (navSize === 'sm') {
								return setNavSize('lg');
							}

							return setNavSize('sm');
						}}
					/>
				</Box>
				{data?.findUsers.map(
					({
						image,
						username,
						email,
						id,
						avatarName,
						short_username: shortUserName,
					}) => (
						<UserItem
							key={id}
							image={image || null}
							username={username}
							navSize={navSize}
							email={email}
							avatarName={avatarName}
							shortUserName={shortUserName}
						/>
					),
				)}
			</Flex>
		</Flex>
	);
};

export default withUrqlClient(urqlClient, { ssr: true })(UsersSidebar);
