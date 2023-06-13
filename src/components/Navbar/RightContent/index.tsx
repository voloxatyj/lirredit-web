import { Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { urqlClient } from '../../../utils/urqlClient';
import { ActionIcons } from './ActionIcons';
import { AuthButtons } from './AuthButtons';
import MenuWrapper from './ProfileMenu/MenuWrapper';

const RightContent: React.FC = () => {
	return (
		<>
			<Flex justifyContent='space-between' alignItems='center'>
				<ActionIcons />
				<AuthButtons />
				<MenuWrapper pageProps={null} />
			</Flex>
		</>
	);
};

export default withUrqlClient(urqlClient)(RightContent);
