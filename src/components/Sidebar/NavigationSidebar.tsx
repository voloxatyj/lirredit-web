import { Box, Divider, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { BsChatSquareText, BsPostcard } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { FiHome, FiMenu } from 'react-icons/fi';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { NavItem } from './NavItem';
import UserItem from './AvatarItem';

export const NavigationSidebar: React.FC = () => {
	const [navSize, setNavSize] = useState<'sm' | 'lg'>('lg');

	return (
		<Flex
			pos='sticky'
			left='5'
			h='90vh'
			marginTop='2.5vh'
			background='whiteAlpha.600'
			boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
			borderRadius={navSize === 'sm' ? '15px' : '30px'}
			w={navSize === 'sm' ? '75px' : '200px'}
			flexDir='column'
			justifyContent='space-between'
		>
			<Flex
				p='5%'
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
						color='whiteAlpha.800'
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
				<NavItem navSize={navSize} title='Dashboard' icon={FiHome} />
				<NavItem navSize={navSize} title='Friends' icon={FaUserFriends} />
				<NavItem navSize={navSize} title='Chats' icon={BsChatSquareText} />
				<NavItem navSize={navSize} title='Posts' icon={BsPostcard} />
				<NavItem
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
				<UserItem pageProps={null} navSize={navSize} />
			</Flex>
		</Flex>
	);
};
