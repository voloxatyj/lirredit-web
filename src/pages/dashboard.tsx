import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import { urqlClient } from '../utils/urqlClient';
import { usePostsQuery } from '../graphql/generated/graphql';
import { Title } from '../components/Title';
import {
	Box,
	Flex,
	Heading,
	Spinner,
	Stack,
	Link,
	Text,
} from '@chakra-ui/react';
import { PageContentLayout } from '../components/Layout/PageContentLayout';
import { formatDate } from '../utils/formatDate';

const Dashboard = () => {
	const [{ data, error }] = usePostsQuery({
		variables: {
			input: {
				limit: 15,
				cursor: 0,
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
			<Stack spacing={8}>
				{data?.posts.posts.map((post) => {
					const { value } = formatDate(post.createdAt).next();
					return (
						<Flex
							key={post.id}
							p={5}
							shadow='md'
							borderWidth='1px'
							display={'grid'}
							bg='white'
							borderRadius='2xl'
							cursor='pointer'
						>
							<Box flex={1}>
								<NextLink href='/post/[id]' as={`/post/${post.id}`}>
									<Link>
										<Heading fontSize='xl'>{post.title}</Heading>
									</Link>
								</NextLink>
								<Text>posted by @{post.users.username}</Text>
								<Flex align='center'>
									<Text flex={1} mt={4} fontSize='md'>
										{post.text}
									</Text>
								</Flex>
							</Box>
							<Text textAlign={'end'} pt={2} fontStyle={'italic'} fontSize='xs'>
								{value}
							</Text>
						</Flex>
					);
				})}
			</Stack>
		</PageContentLayout>
	);
};

export default withUrqlClient(urqlClient)(Dashboard);
