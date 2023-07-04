import React from 'react';
import { IconType } from 'react-icons';
import { Icon, Link, Text } from '@chakra-ui/react';

interface INavLink {
	href: string;
	icon?: IconType;
	text?: string;
}

export const NavLink: React.FC<INavLink> = ({ href, icon, text }) => {
	return (
		<Link
			p={3}
			pl={1}
			href={href}
			borderRadius={8}
			_hover={{
				textDecor: 'none',
				transform: 'translateY(-10px)',
			}}
			transition={'0.5s'}
			m={'0 10px'}
			w={'10%'}
			cursor='pointer'
		>
			{icon ? (
				<Icon boxSize={40} color={'#3182ce'} as={icon} />
			) : (
				<Text fontSize={20} color={'#3182ce'}>
					{text}
				</Text>
			)}
		</Link>
	);
};
