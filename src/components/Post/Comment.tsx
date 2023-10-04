import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { Avatar, Box, Flex, VStack, Text, Grid } from '@chakra-ui/react';
import { ActionIcons } from './ActionIcons';
import { User } from '../../graphql/generated/graphql';

export interface IComment {
	id: number;
	commentId?: number;
	createdAt: string;
	images:
		| { public_id: string; secure_url: string }[]
		| { public_id: string; secure_url: string }
		| null;
	postId: number;
	text: string;
	users: User;
	views: number;
}

export const Comment: React.FC<IComment> = (comment: IComment) => {
	const [showMore, setShowMore] = useState<boolean>(false);
	const { value } = formatDate(comment.createdAt).next();
	return (
		<VStack align={'start'} p={3} pl={9}>
			<Flex>
				<Box>
					{comment.users.image ? (
						<Avatar size='md' src={comment.users.image} />
					) : (
						<Avatar
							bg='#ffff'
							name={comment?.users?.avatarName || ''}
							color='blue.800'
							showBorder
							borderColor='blue.500'
							borderWidth={3}
						/>
					)}
				</Box>
				<Grid pl={2}>
					<Text fontWeight={'bold'}>
						@{comment.users.username} · {value}
					</Text>
					<Text>{comment.text}</Text>
				</Grid>
			</Flex>
			<Box w={'100%'} mt={'10px'}>
				<ActionIcons
					commentsCount={'0'}
					isLike={false}
					likesCount={'0'}
					views={'0'}
					id={comment.id}
					viewIcon={true}
				/>
			</Box>
		</VStack>
	);
};
