import { Avatar, AvatarBadge, Flex, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useGetUserQuery } from '../../graphql/generated/graphql';
import { isServer } from '../../utils/isServer';
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

	return (
		<Flex mt='4' align='cnter' cursor={'pointer'}>
			{user?.image ? (
				<Avatar size='md' src={user.image}>
					<AvatarBadge boxSize='1.25em' bg='green.500' />
				</Avatar>
			) : (
				<Avatar size='md' bg='whatsapp.200' name='KR' showBorder>
					<AvatarBadge boxSize='1.25em' bg='green.500' />
				</Avatar>
			)}
			{navSize === 'lg' && (
				<Heading as='h1' size='xl' ml='4'>
					{user?.username.substring(0, 8)}
				</Heading>
			)}
		</Flex>
	);
};

export default withUrqlClient(urqlClient)(AvatarItem);
