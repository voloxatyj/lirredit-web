import { ChangeEvent, useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Input,
	Text,
} from '@chakra-ui/react';
import { urqlClient } from '../../utils/urqlClient';
import { withUrqlClient } from 'next-urql';
import {
	PostResponse,
	User,
	useCreateCommentMutation,
	usePostQuery,
	useGetUserQuery,
} from '../../graphql/generated/graphql';
import { useGetIntId } from '../../utils/useGetIntId';
import { AlertMessage } from '../../components/Global/AlertMessage';
import { PostContentLayoutVariant } from '../../components/Layout/PostContentLayout';
import { parseDatePost } from '../../utils/formatDate';
import { IoIosArrowDropleft } from 'react-icons/io';
import Link from 'next/link';
import { ActionIcons } from '../../components/Post/ActionIcons';
import { InformationBlock } from '../../components/Post/InformationBlock';
import { randomRgbColor } from '../../utils/rndRGBColor';

const Post = () => {
	const { postId } = useGetIntId();
	const getUser = useGetUserQuery();
	const user = getUser[0]?.data?.getUser as User;
	const [, createComment] = useCreateCommentMutation();
	const [{ data }] = usePostQuery({ variables: { input: { postId } } });
	const { post, errors, isLike } = (data?.getPost as PostResponse) || {};
	const { value: time } = parseDatePost(post?.createdAt).next();
	const [text, setText] = useState<string>('');
	const [label, setLabel] = useState<boolean>(false);

	const handleReply = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handlecreateComment = () => {
		setLabel(!label);
		setText('');
		createComment({ input: { text, postId: post?.id as number } });
	};

	let avatarBG;

	if (!user?.image) {
		avatarBG = randomRgbColor().next();
	}

	return (
		<Box>
			{post && (
				<PostContentLayoutVariant>
					<>
						<Box backgroundColor={'white'} borderTopRadius={'15px'} maxW='80vw'>
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
												color='blue.800'
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
							<Grid p={4}>
								<GridItem pl={6}>
									<InformationBlock
										commentsCount={post.comments_count}
										likesCount={post.likes_count}
										retweetsCount={0}
									/>
								</GridItem>
								<GridItem pl={4}>
									<ActionIcons isLike={isLike} />
								</GridItem>
							</Grid>
						</Box>
						<Grid>
							{(label || text) && (
								<Flex
									backgroundColor={'white'}
									pl={24}
									fontStyle={'italic'}
									alignItems={'baseline'}
								>
									<Text>Replying to</Text>
									<Text color={'blue.500'} pl={1}>
										@{post.users.username}
									</Text>
								</Flex>
							)}
							<Flex
								backgroundColor={'white'}
								borderBottomRadius={'15px'}
								maxW={'80vw'}
								p='6'
								pt={1}
								pl={8}
								gap={2}
							>
								{user.image && !avatarBG ? (
									<Avatar size='md' src={user.image} />
								) : (
									<Avatar
										size='md'
										bg={avatarBG?.value}
										name={user?.avatarName || ''}
										showBorder
									/>
								)}
								<Input
									fontWeight={500}
									fontSize={'x-large'}
									placeholder='Post your Reply!'
									type='email'
									onChange={handleReply}
									onClick={() => setLabel(!label)}
									value={text}
								/>
								<Button onClick={handlecreateComment} opacity={text ? 1 : 0.5}>
									Reply
								</Button>
							</Flex>
						</Grid>
					</>
				</PostContentLayoutVariant>
			)}
			<Box>{errors && <AlertMessage message={errors[0].message} />}</Box>;
		</Box>
	);
};

export default withUrqlClient(urqlClient, { ssr: false })(Post);
