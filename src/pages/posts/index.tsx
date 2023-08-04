import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Flex, Heading, Spinner, Stack } from '@chakra-ui/react';
import { Title } from '../../components/Global/Title';
import { PageContentLayout } from '../../components/Layout/PageContentLayout';
import { Post } from '../../components/Post/Post';
import { usePostsQuery } from '../../graphql/generated/graphql';
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
									images={images}
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
