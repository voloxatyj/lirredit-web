import { Box, Flex, Text } from '@chakra-ui/react';

interface IInformationBlock {
	commentsCount: string;
	likesCount: string;
	retweetsCount: number;
}

export const InformationBlock: React.FC<IInformationBlock> = ({
	commentsCount,
	likesCount,
	retweetsCount,
}) => (
	<Flex
		alignItems={'center'}
		justifyContent={'start'}
		borderRadius={8}
		cursor='pointer'
	>
		<Flex gap={1} pr={2}>
			<Text color={'blue.500'} fontSize={14}>
				{commentsCount}
			</Text>
			<Text color={'blackAlpha.600'} fontSize={14}>
				Comments
			</Text>
		</Flex>
		<Flex gap={1} pr={2}>
			<Text color={'blue.500'} fontSize={14}>
				{likesCount}
			</Text>
			<Text color={'blackAlpha.600'} fontSize={14}>
				Likes
			</Text>
		</Flex>
		<Flex gap={1} pr={2}>
			<Text color={'blue.500'} fontSize={14}>
				{retweetsCount}
			</Text>
			<Text color={'blackAlpha.600'} fontSize={14}>
				Retweets
			</Text>
		</Flex>
	</Flex>
);
