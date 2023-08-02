import {
	Avatar,
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text,
} from '@chakra-ui/react';
import { urqlClient } from '../../utils/urqlClient';
import { withUrqlClient } from 'next-urql';
import { PostResponse, usePostQuery } from '../../graphql/generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';
import { AlertMessage } from '../../components/Global/AlertMessage';
import { PostContentLayoutVariant } from '../../components/Layout/PostContentLayout';
import { parseDatePost } from '../../utils/formatDate';
import { IoIosArrowDropleft } from 'react-icons/io';
import Link from 'next/link';

const Post = () => {
	const { postId } = useGetIntId();
	const [{ data }] = usePostQuery({ variables: { id: postId } });
	const { post, errors, isLike } = (data?.getPost as PostResponse) || {};
	const { value: time } = parseDatePost(post?.createdAt).next();

	return (
		<Box>
			{post && (
				<PostContentLayoutVariant>
					<>
						<Box backgroundColor={'white'} borderRadius={'15px'} maxW='80vw'>
							<Link href={'/posts'}>
								<Flex
									alignItems={'center'}
									fontStyle={'italic'}
									p='6'
									cursor={'pointer'}
								>
									<IoIosArrowDropleft size={24} fill='#3182ce' />
									<Text fontSize='2xl' color={'blue.500'} pl='2'>
										Post
									</Text>
								</Flex>
							</Link>
							<Grid
								templateAreas={`"header header"
                  "text text"
									"time time"`}
								h='200px'
								p={4}
							>
								<GridItem
									pl='2'
									area={'header'}
									display={'inline-flex'}
									justifySelf={'left'}
									alignItems={'center'}
								>
									<Box pl={4}>
										{post.users.image ? (
											<Avatar size='md' src={post.users.image} />
										) : (
											<Avatar
												bg='#ffff'
												name={post?.users?.avatarName || ''}
												showBorder
												borderColor='blue.500'
												borderWidth={3}
											/>
										)}
									</Box>
									<Flex direction={'column'} pl={4}>
										<Heading fontSize='xl'>{post.title}</Heading>
										<Flex>
											<Text color={'blue.500'}>@{post.users.username}</Text>
										</Flex>
									</Flex>
								</GridItem>
								<GridItem pl='6' area={'text'}>
									<Flex align='center'>
										<Text flex={1} mt={3} fontSize='md'>
											{post.text}
										</Text>
									</Flex>
								</GridItem>
								<GridItem pl='6' area={'time'}>
									<Flex align='center'>
										<Text
											textAlign={'end'}
											pt={1}
											fontStyle={'italic'}
											fontSize='xs'
											color={'blue.500'}
										>
											{`${time} ${data?.getPost?.post?.views} Views`}
										</Text>
									</Flex>
								</GridItem>
							</Grid>
						</Box>
					</>
				</PostContentLayoutVariant>
			)}
			<Box>{errors && <AlertMessage message={errors[0].message} />}</Box>;
		</Box>
	);
};

export default withUrqlClient(urqlClient, { ssr: true })(Post);
