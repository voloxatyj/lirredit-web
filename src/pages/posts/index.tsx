import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Heading,
	Icon,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { default as Link, default as NextLink } from 'next/link';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { Carousel } from '../../components/Global/Carousel';
import { Title } from '../../components/Global/Title';
import { PageContentLayout } from '../../components/Layout/PageContentLayout';
import {
	usePostsQuery,
	useLikePostMutation,
} from '../../graphql/generated/graphql';
import { formatDate } from '../../utils/formatDate';
import { urqlClient } from '../../utils/urqlClient';

const Posts = () => {
	const [, like] = useLikePostMutation();
	const [cursor, setCursor] = useState<number>(0);
	const [{ data, error }] = usePostsQuery({
		variables: {
			input: {
				limit: 5,
				cursor,
			},
		},
	});

	if (!data || error) {
		return (
			<PageContentLayout>
				<div
					style={{
						display: 'grid',
						justifyItems: 'center',
						marginTop: '20rem',
					}}
				>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
					<Title text='loading...' />
				</div>
			</PageContentLayout>
		);
	}

	return (
		<PageContentLayout>
			<Flex justifyContent='space-around'>
				<Stack spacing={4}>
					<Flex
						justifyContent='space-around'
						alignItems={'center'}
						maxH={'25px'}
						cursor={'pointer'}
					>
						<ArrowLeftIcon
							cursor='pointer'
							onClick={() => {
								if (cursor === 0) {
									return;
								}

								setCursor(cursor - 1);
							}}
						/>
						<Heading fontSize={45} textAlign={'center'}>
							{'Posts'}
						</Heading>
						<ArrowRightIcon
							cursor='pointer'
							onClick={() => setCursor(cursor + 1)}
						/>
					</Flex>
					{data.getPosts.posts &&
						data?.getPosts.isLikes &&
						data?.getPosts?.posts.map(
							(
								{
									id,
									title,
									createdAt,
									users,
									short_text: shortText,
									images,
									comments_count: commentsCount,
									likes_count: likesCount,
								},
								idx,
							) => {
								const isLike = data?.getPosts.isLikes[idx];
								const { value } = formatDate(createdAt).next();
								return (
									<Flex
										p={5}
										key={id}
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
														{`${shortText}...`}
														<Link
															style={{ color: '#3182ce', paddingLeft: '5px' }}
															href='/post/[id]'
															as={`/post/${id}`}
														>
															Show more
														</Link>
													</Text>
												</Flex>
											</Box>
											<Text
												textAlign={'end'}
												pt={1}
												fontStyle={'italic'}
												fontSize='xs'
											>
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
													onClick={() =>
														like({ input: { postId: id, isLike } })
													}
												/>
												<Text color={'blue.500'} fontSize={14}>
													{likesCount}
												</Text>
											</Flex>
										</Box>
									</Flex>
								);
							},
						)}
				</Stack>
			</Flex>
		</PageContentLayout>
	);
};

export default withUrqlClient(urqlClient)(Posts);
