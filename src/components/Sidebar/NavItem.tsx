import {
	Flex,
	Icon,
	Menu,
	MenuButton,
	Text,
	Link,
	Divider,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface INavItem {
	title: string;
	navSize: 'sm' | 'lg';
	icon: IconType;
}

export const NavItem: React.FC<INavItem> = ({ navSize, title, icon }) => (
	<Flex
		mt={30}
		flexDir='column'
		w='100%'
		alignItems={navSize === 'sm' ? 'center' : 'flex-start'}
	>
		<Divider
			colorScheme='whiteAlpha'
			display={navSize === 'sm' ? 'none' : 'flex'}
		/>
		<Menu placement='right'>
			<Link
				p={3}
				pl={1}
				borderRadius={8}
				_hover={{ textDecor: 'none', backgroundColor: 'blue.500' }}
				w={navSize === 'lg' ? '100%' : '70%'}
				cursor='pointer'
			>
				<MenuButton w='100%'>
					<Flex display='flex' alignItems='center'>
						<Icon
							boxSize={navSize === 'sm' ? 10 : 8}
							color='whiteAlpha.800'
							as={icon}
						/>
						<Text
							display={navSize === 'sm' ? 'none' : 'flex'}
							fontSize='3xl'
							color='white'
							pt={1}
							pl={2}
						>
							{title}
						</Text>
					</Flex>
				</MenuButton>
			</Link>
		</Menu>
		<Divider display={navSize === 'sm' ? 'none' : 'flex'} />
	</Flex>
);
