import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import { PageContentLayout } from '../../components/Layout/PageContentLayout';
import { Title } from '../../components/Title';
import { usePostsQuery } from '../../graphql/generated/graphql';
import { formatDate } from '../../utils/formatDate';
import { urqlClient } from '../../utils/urqlClient';
import Link from 'next/link';
import { Carousel } from '../../components/Carousel';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { ActionIcon } from '../../components/Navbar/RightContent/ActionIcon';

const icons = [
	{
		icon: FaRegComment,
		fontSize: 20,
		onClick: () => console.log('comment'),
	},
	{
		icon: FaRetweet,
		fontSize: 20,
		onClick: () => console.log('retweet'),
	},
	{
		icon: AiOutlineHeart,
		fontSize: 22,
		onClick: () => console.log('like'),
	},
];

const Posts = () => {
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
					{data.posts.posts &&
						data?.posts?.posts.map(
							({
								id,
								title,
								createdAt,
								users,
								short_text: shortText,
								images,
							}) => {
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
											{icons.map(({ icon, onClick, fontSize }, idx) => (
												<ActionIcon
													icon={icon}
													fontSize={fontSize}
													onClick={onClick}
													key={idx}
												/>
											))}
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
