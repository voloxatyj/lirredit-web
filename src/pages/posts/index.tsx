import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { PageContentLayout } from '../../components/Layout/PageContentLayout';
import { Post } from '../../components/Post/Post';
import { usePostsQuery } from '../../graphql/generated/graphql';
import { urqlClient } from '../../utils/urqlClient';
import { Loader } from '../../components/Global/Loader';
import { ErrorBoundary } from '../../components/Global/ErrorBoundary';
import { useRouter } from 'next/router';

const Posts = () => {
	const router = useRouter();
	const [cursor, setCursor] = useState<number>(0);
	const [{ data, error }] = usePostsQuery({
		variables: {
			input: {
				limit: 5,
				cursor,
			},
		},
	});

	if (error) {
		return <ErrorBoundary error={error} reset={() => router.push('/')} />;
	}

	if (!data || error) {
		return (
			<PageContentLayout>
				<Box
					style={{
						display: 'grid',
						justifyItems: 'center',
						marginTop: '20rem',
					}}
				>
					<Loader />
				</Box>
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
									text,
									short_text: shortText,
									images,
									comments_count: commentsCount,
									likes_count: likesCount,
									views,
								},
								idx,
							) => (
								<Post
									key={idx}
									idx={idx}
									id={id}
									title={title}
									createdAt={createdAt}
									text={text}
									shortText={shortText}
									images={images || []}
									commentsCount={commentsCount}
									likesCount={likesCount}
									views={views}
									users={users}
									isLike={data?.getPosts.isLikes[idx]}
								/>
							),
						)}
				</Stack>
			</Flex>
		</PageContentLayout>
	);
};

export default withUrqlClient(urqlClient)(Posts);
