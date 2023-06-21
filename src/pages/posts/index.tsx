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
				<ArrowLeftIcon
					cursor='pointer'
					onClick={() => {
						if (cursor === 0) {
							return;
						}

						return setCursor(cursor - 1);
					}}
				/>
				<Stack spacing={4} pt={3}>
					{data?.posts.posts.map((post) => {
						const { value } = formatDate(post.createdAt).next();
						return (
							<NextLink key={post.id} href='/post/[id]' as={`/post/${post.id}`}>
								<Flex
									p={5}
									shadow='md'
									borderWidth='1px'
									display={'grid'}
									bg='white'
									borderRadius='2xl'
									cursor='pointer'
								>
									<Box flex={1}>
										<Heading fontSize='xl'>{post.title}</Heading>
										<Text>posted by @{post.users.username}</Text>
										<Flex align='center'>
											<Text flex={1} mt={3} fontSize='md'>
												{`${post.short_text}...`}
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
								</Flex>
							</NextLink>
						);
					})}
				</Stack>
				<ArrowRightIcon
					cursor='pointer'
					onClick={() => setCursor(cursor + 1)}
				/>
			</Flex>
		</PageContentLayout>
	);
};

export default withUrqlClient(urqlClient)(Posts);
