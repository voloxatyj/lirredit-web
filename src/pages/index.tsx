import React from 'react';
import Image from 'next/image';
import { PageContentLayout } from '../components/Layout/PageContentLayout';
import logo from '../assets/icon.png';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Index = () => {
	const router = useRouter();
	return (
		<PageContentLayout>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '40vh',
					cursor: 'pointer',
				}}
				onClick={() => router.push('/login')}
			>
				<Image src={logo} alt='logo' width={50} height={50} />
				<Heading fontSize={80}>{'LiRedditChat'}</Heading>
			</div>
		</PageContentLayout>
	);
};

export default Index;
