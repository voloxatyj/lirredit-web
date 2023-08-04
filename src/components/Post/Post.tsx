import { useState } from 'react';
import { default as Link, default as NextLink } from 'next/link';
import {
	useLikePostMutation,
	useViewPostMutation,
} from '../../graphql/generated/graphql';
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { formatDate } from '../../utils/formatDate';
import { Carousel } from '../Global/Carousel';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBarChartFill } from 'react-icons/bs';

interface IPost {
	isLike: boolean;
	createdAt: string;
	idx: number;
	id: number;
	title: string;
	text: string;
	shortText: string;
	images: { public_id: string; secure_url: string }[];
	commentsCount: string;
	likesCount: string;
	views: string;
	users: { username: string; avatarName: string; email: string; id: number };
}

export const Post: React.FC<IPost> = ({
	isLike,
	createdAt,
	idx,
	id,
	views,
	title,
	text,
	shortText,
	images,
	commentsCount,
	likesCount,
	users,
}) => {
	const [showMore, setShowMore] = useState<boolean>(false);
	const [, like] = useLikePostMutation();
	const [, view] = useViewPostMutation();
	const { value } = formatDate(createdAt).next();
	return (
		<Flex
			p={5}
			key={idx}
			shadow='md'
			borderWidth='1px'
			display={'grid'}
			bg='white'
			borderRadius='2xl'
			cursor='pointer'
		>
			<NextLink
				href='/post/[id]'
				as={`/post/${id}`}
				onClick={() => view({ input: { postId: id, views: views + 1 } })}
			>
				<Box flex={1} minW='500px'>
					<Heading fontSize='xl'>{title}</Heading>
					<Flex>
						<Text>posted by</Text>
						<Text color={'blue.500'}>@{users.username}</Text>
					</Flex>
					<Flex align='center'>
						<Text flex={1} mt={3} fontSize='md'>
							{showMore ? text : `${shortText}...`}
							{!showMore && (
								<Link
									style={{ color: '#3182ce', paddingLeft: '5px' }}
									href='#'
									onClick={() => setShowMore(!showMore)}
								>
									Show more
								</Link>
							)}
						</Text>
					</Flex>
				</Box>
				<Text textAlign={'end'} pt={1} fontStyle={'italic'} fontSize='xs'>
					{value}
				</Text>
			</NextLink>
			{images.length > 0 && <Carousel slides={images} />}
			<Box className='action_icons'>
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
						as={FaRegComment}
						onClick={() => console.log('comment')}
					/>
					<Text color={'blue.500'} fontSize={14}>
						{commentsCount}
					</Text>
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
					<Text color={'blue.500'} fontSize={14}>
						{0}
					</Text>
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
						as={isLike ? AiFillHeart : AiOutlineHeart}
						onClick={() => like({ input: { postId: id, isLike } })}
					/>
					<Text color={'blue.500'} fontSize={14}>
						{likesCount}
					</Text>
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
					<Icon color={'#3182ce'} as={BsBarChartFill} />
					<Text color={'blue.500'} fontSize={14}>
						{views}
					</Text>
				</Flex>
			</Box>
		</Flex>
	);
};
