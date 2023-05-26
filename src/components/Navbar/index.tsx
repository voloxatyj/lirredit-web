import { Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import Image from 'next/image';
import React from 'react';
import logo from '../../images/istockphoto.jpg';
import { urqlClient } from '../../utils/urqlClient';
import RightContent from './RightContent';
import { SearchInput } from './SearchInput';

const Navbar: React.FC = () => {
	return (
		<Flex
			bg='white'
			height='64px'
			padding='6px 12px'
			justifyContent={{ md: 'space-between' }}
		>
			<Flex
				align='center'
				width={{ base: '40px', md: 'auto' }}
				mr={{ base: 0, md: 2 }}
				cursor='pointer'
			>
				<Image src={logo} alt='logo' width={50} height={50} />
			</Flex>
			<SearchInput />
			<RightContent pageProps={null} />
		</Flex>
	);
};

export default withUrqlClient(urqlClient, { ssr: true })(Navbar);
