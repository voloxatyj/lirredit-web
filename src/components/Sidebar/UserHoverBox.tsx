import { Avatar, AvatarBadge, Flex, Heading, Text } from '@chakra-ui/react';

interface IUserHoverBox {
	navSize?: string;
	image?: string | null;
	username?: string;
	avatarName?: string | null;
	background?: string;
	email: string;
}

export const UserHoverBox: React.FC<IUserHoverBox> = ({
	navSize,
	image,
	username,
	background,
	avatarName,
	email,
}) => (
	<>
		<Flex pos='absolute' w={0} h={0} />
		<Flex
			h={150}
			w={200}
			pt={15}
			flexDir='column'
			alignItems='center'
			backgroundColor='blue.500'
			borderRadius='10px'
			color='#fff'
			textAlign='center'
		>
			{image ? (
				<Avatar size='md' src={image}>
					<AvatarBadge boxSize='1.25em' bg='green.500' />
				</Avatar>
			) : (
				<Avatar size='md' bg={background} name={avatarName || ''} showBorder>
					<AvatarBadge boxSize='1.25em' bg='green.500' />
				</Avatar>
			)}
			<Heading as='h1' size='lg' ml='4' color='white'>
				{username}
			</Heading>
			<Text fontSize='md' color='white'>
				{email}
			</Text>
		</Flex>
	</>
);
