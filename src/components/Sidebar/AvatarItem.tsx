import { Avatar, AvatarBadge, Flex, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useGetUserQuery } from '../../graphql/generated/graphql';
import { isServer } from '../../utils/isServer';
import { randomRgbColor } from '../../utils/rndRGBColor';
import { urqlClient } from '../../utils/urqlClient';

interface IAvatarItem {
	navSize: string;
}

const AvatarItem: React.FC<IAvatarItem> = ({
	navSize,
}: {
	navSize: string;
}) => {
	const [{ data }] = useGetUserQuery({
		pause: isServer(),
	});
	const user = data?.getUser;
	const avatarName = user?.avatarName;
	const short_username = user?.short_username;

	let avatarBG = null;

	if (!user?.image) {
		avatarBG = randomRgbColor().next();
	}

	return (
		<Flex mt='4' align='center' cursor={'pointer'}>
			{user?.image ? (
				<Avatar size='md' src={user.image}>
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
					{short_username}
				</Heading>
			)}
		</Flex>
	);
};

export default withUrqlClient(urqlClient)(AvatarItem);
