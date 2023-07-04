import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import {
	IoFilterCircleOutline,
	IoNotificationsOutline,
	IoVideocamOutline,
} from 'react-icons/io5';
import { urqlClient } from '../../../utils/urqlClient';
import { ActionIcon } from './ActionIcon';
import { AuthButtons } from './AuthButtons';
import MenuWrapper from './ProfileMenu/MenuWrapper';
import CreatePost from '../../Modals/CreatePost';

const RightContent: React.FC = () => {
	const {
		isOpen: isOpenPostModal,
		onOpen: onOpenPostModal,
		onClose: onClosePostModal,
	} = useDisclosure();
	const icons = [
		{
			icon: BsArrowUpRightCircle,
			fontSize: 20,
		},
		{
			icon: IoFilterCircleOutline,
			fontSize: 20,
		},
		{
			icon: IoVideocamOutline,
			fontSize: 22,
		},
		{
			icon: BsChatDots,
			fontSize: 20,
		},
		{
			icon: IoNotificationsOutline,
			fontSize: 20,
		},
		{
			icon: IoMdAddCircleOutline,
			fontSize: 22,
			onClick: onOpenPostModal,
		},
	];
	return (
		<>
			<Flex justifyContent='space-between' alignItems='center'>
				<Flex alignItems='center' flexGrow={1}>
					<Box
						display={{ base: 'none', md: 'flex' }}
						alignItems='center'
						borderRight='1px solid'
						borderColor='gray.200'
						mr={3}
					>
						{icons.map(({ icon, onClick, fontSize }, idx) => (
							<ActionIcon
								key={idx}
								icon={icon}
								fontSize={fontSize}
								onClick={onClick}
							/>
						))}
					</Box>
				</Flex>
				<AuthButtons />
				<MenuWrapper pageProps={null} />
				<CreatePost
					text={'Create Post'}
					pageProps={'none'}
					isOpen={isOpenPostModal}
					onClose={onClosePostModal}
				/>
			</Flex>
		</>
	);
};

export default withUrqlClient(urqlClient)(RightContent);
