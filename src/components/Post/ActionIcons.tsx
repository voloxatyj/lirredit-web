import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBarChartFill } from 'react-icons/bs';
import { useLikePostMutation } from '../../graphql/generated/graphql';

interface IActionIcons {
	commentsCount?: string;
	isLike?: boolean;
	likesCount?: string;
	id?: number;
	views?: string;
	viewIcon: boolean;
}

export const ActionIcons: React.FC<IActionIcons> = ({
	commentsCount,
	likesCount,
	isLike,
	views,
	id,
	viewIcon,
}) => {
	const [, like] = useLikePostMutation();
	return (
		<Box className='action_icons' marginBottom={views ? 0 : 30}>
			<Flex
				p={3}
				alignItems={'center'}
				justifyContent={'space-around'}
				borderRadius={8}
				w={'10%'}
				cursor='pointer'
			>
				<Icon
					color={'#3182ce'}
					as={FaRegComment}
					onClick={() => console.log('comment')}
				/>
				{commentsCount && (
					<Text color={'blue.500'} fontSize={14}>
						{commentsCount}
					</Text>
				)}
			</Flex>
			<Flex
				p={3}
				pl={1}
				alignItems={'center'}
				justifyContent={'space-evenly'}
				borderRadius={8}
				m={'0 10px'}
				w={'10%'}
				cursor='pointer'
			>
				<Icon
					color={'#3182ce'}
					as={FaRetweet}
					onClick={() => console.log('retweet')}
				/>
				{commentsCount && (
					<Text color={'blue.500'} fontSize={14}>
						{0}
					</Text>
				)}
			</Flex>
			<Flex
				p={3}
				pl={1}
				alignItems={'center'}
				justifyContent={'space-evenly'}
				borderRadius={8}
				m={'0 10px'}
				w={'10%'}
				cursor='pointer'
			>
				{isLike !== undefined && id ? (
					<Icon
						color={'#3182ce'}
						as={isLike ? AiFillHeart : AiOutlineHeart}
						onClick={() => like({ input: { postId: id, isLike } })}
					/>
				) : (
					<Icon color={'#3182ce'} as={isLike ? AiFillHeart : AiOutlineHeart} />
				)}
				{likesCount && (
					<Text color={'blue.500'} fontSize={14}>
						{likesCount}
					</Text>
				)}
			</Flex>
			{viewIcon && (
				<Flex
					p={3}
					pl={1}
					alignItems={'center'}
					justifyContent={'space-evenly'}
					borderRadius={8}
					m={'0 10px'}
					w={'10%'}
					cursor='pointer'
				>
					<Icon color={'#3182ce'} as={BsBarChartFill} />
					<Text color={'blue.500'} fontSize={14}>
						{views}
					</Text>
				</Flex>
			)}
		</Box>
	);
};
