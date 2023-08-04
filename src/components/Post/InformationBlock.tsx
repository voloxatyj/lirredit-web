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
		justifyContent={'space-evenly'}
		borderRadius={8}
		m={'0 10px'}
		w={'30%'}
		cursor='pointer'
	>
		<Flex gap={1}>
			<Text color={'blue.500'} fontSize={14}>
				{commentsCount}
			</Text>
			<Text color={'blackAlpha.600'} fontSize={14}>
				Comments
			</Text>
		</Flex>
		<Flex gap={1}>
			<Text color={'blue.500'} fontSize={14}>
				{likesCount}
			</Text>
			<Text color={'blackAlpha.600'} fontSize={14}>
				Likes
			</Text>
		</Flex>
		<Flex gap={1}>
			<Text color={'blue.500'} fontSize={14}>
				{retweetsCount}
			</Text>
			<Text color={'blackAlpha.600'} fontSize={14}>
				Retweets
			</Text>
		</Flex>
	</Flex>
);
