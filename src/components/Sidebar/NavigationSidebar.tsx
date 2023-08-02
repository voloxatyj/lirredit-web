import { Box, Divider, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { BsChatSquareText, BsPostcard } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { FiHome, FiMenu } from 'react-icons/fi';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { NavItem } from './NavItem';
import { AvatarItem } from './AvatarItem';
import { User, useGetUserQuery } from '../../graphql/generated/graphql';
import { isServer } from '../../utils/isServer';
import { withUrqlClient } from 'next-urql';
import { urqlClient } from '../../utils/urqlClient';

interface INavigationSidebarProps {
	size?: 'sm' | 'lg';
}

const NavigationSidebar: React.FC<INavigationSidebarProps> = ({ size }) => {
	const [navSize, setNavSize] = useState<'sm' | 'lg'>(size || 'lg');
	const [{ data }] = useGetUserQuery({
		pause: isServer(),
	});

	const user = data?.getUser as User;

	return (
		<Flex
			pos='sticky'
			left='5'
			marginTop='2.5vh'
			background='whiteAlpha.600'
			boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
			borderRadius={navSize === 'sm' ? '15px' : '30px'}
			w={navSize === 'sm' ? '75px' : '200px'}
			flexDir='column'
			justifyContent='space-between'
		>
			<Flex
				p='2%'
				justifyContent='center'
				flexDir='column'
				alignItems='flex-start'
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
				<NavItem href='/' navSize={navSize} title='Dashboard' icon={FiHome} />
				<NavItem
					href='/friends'
					navSize={navSize}
					title='Friends'
					icon={FaUserFriends}
				/>
				<NavItem
					href='/chats'
					navSize={navSize}
					title='Chats'
					icon={BsChatSquareText}
				/>
				<NavItem
					href='/posts'
					navSize={navSize}
					title='Posts'
					icon={BsPostcard}
				/>
				<NavItem
					href='/settings'
					navSize={navSize}
					title='Settings'
					icon={MdOutlineSettingsSuggest}
				/>
			</Flex>

			<Flex
				p='5%'
				flexDir='column'
				w='100%'
				alignItems={navSize === 'sm' ? 'center' : 'flex-start'}
				mb='4'
			>
				<Divider display={navSize === 'sm' ? 'none' : 'flex'} />
				<AvatarItem
					navSize={navSize}
					image={user?.image || null}
					username={user?.username}
					email={user?.email}
					avatarName={user?.avatarName}
					shortUserName={user?.short_username}
				/>
			</Flex>
		</Flex>
	);
};

export default withUrqlClient(urqlClient)(NavigationSidebar);
