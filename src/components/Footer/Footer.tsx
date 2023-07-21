import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { NavLink } from './NavLink';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { BiCopyright } from 'react-icons/bi';

export const Footer = (props: FlexProps) => (
	<Flex as='footer' className='footer_container' {...props}>
		<ul className='social_icons'>
			<NavLink href='#' icon={FaFacebook} />
			<NavLink href='#' icon={FaTwitter} />
			<NavLink href='#' icon={FaLinkedin} />
			<NavLink href='#' icon={FaInstagram} />
		</ul>
		<ul className='menu'>
			<NavLink href='#' text={'Menu'} />
			<NavLink href='#' text={'About'} />
			<NavLink href='#' text={'Services'} />
			<NavLink href='#' text={'Team'} />
			<NavLink href='#' text={'Contact'} />
		</ul>
		<Flex justifyContent={'center'} alignItems={'baseline'}>
			<BiCopyright color={'#3182ce'} />
			<Text mt={15} fontSize={20} fontWeight={'bold'} color={'#3182ce'}>
				2023 | All Rights Reserved
			</Text>
		</Flex>
	</Flex>
);
