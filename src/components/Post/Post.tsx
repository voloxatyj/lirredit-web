import { useState } from 'react';
import { default as Link, default as NextLink } from 'next/link';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { formatDate } from '../../utils/formatDate';
import { Carousel } from '../Global/Carousel';
import { ActionIcons } from './ActionIcons';

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
			<NextLink href='/post/[id]' as={`/post/${id}`}>
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
									onClick={(e) => {
										e.preventDefault();
										setShowMore(!showMore);
									}}
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
			<ActionIcons
				commentsCount={commentsCount}
				isLike={isLike}
				likesCount={likesCount}
				views={views}
				id={id}
			/>
		</Flex>
	);
};
