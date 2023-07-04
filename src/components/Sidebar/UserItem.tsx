import {
	Avatar,
	AvatarBadge,
	Divider,
	Flex,
	Heading,
	Menu,
	MenuButton,
	MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { randomRgbColor } from '../../utils/rndRGBColor';
import { UserHoverBox } from './UserHoverBox';

interface IUserItem {
	image: string | null;
	navSize: 'sm' | 'lg';
	username: string;
	email: string;
	avatarName: string;
	shortUserName: string;
}

export const UserItem: React.FC<IUserItem> = ({
	navSize,
	image,
	username,
	email,
	avatarName,
	shortUserName,
}) => {
	let avatarBG = null;

	if (!image) {
		avatarBG = randomRgbColor().next();
	}

	return (
		<Flex
			mt={30}
			flexDir='column'
			w='100%'
			alignItems={navSize === 'sm' ? 'center' : 'flex-start'}
		>
			<Divider display={navSize === 'sm' ? 'none' : 'flex'} />
			<Menu placement='left'>
				<MenuButton
					w={navSize === 'lg' ? '100%' : '70%'}
					borderRadius={8}
					_hover={{ textDecor: 'none', backgroundColor: 'blue.500' }}
				>
					<Flex
						mt='2'
						mb='2'
						align='center'
						p={3}
						pl={0}
						borderRadius={8}
						w={navSize === 'lg' ? '100%' : '70%'}
						cursor='pointer'
					>
						{image ? (
							<Avatar size='md' src={image}>
								<AvatarBadge boxSize='1.25em' bg='green.500' />
							</Avatar>
						) : (
							<Avatar
								size='md'
								bg={avatarBG?.value}
								name={avatarName || ''}
								showBorder
							>
								<AvatarBadge boxSize='1.25em' bg='green.500' />
							</Avatar>
						)}
						{navSize === 'lg' && (
							<Heading as='h1' size='xl' ml='4'>
								{shortUserName}
							</Heading>
						)}
					</Flex>
					<MenuList
						py={0}
						background='none'
						border='none'
						w={200}
						h={200}
						ml={5}
						mr={5}
						mt={10}
					>
						<UserHoverBox
							navSize={navSize}
							background={avatarBG?.value}
							username={username}
							avatarName={avatarName}
							image={image}
							email={email}
						/>
					</MenuList>
				</MenuButton>
			</Menu>
			<Divider display={navSize === 'sm' ? 'none' : 'flex'} />
		</Flex>
	);
};
