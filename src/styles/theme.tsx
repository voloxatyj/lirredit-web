import { extendTheme } from '@chakra-ui/react';
import { Button } from './button';
import { Input } from './input';

const breakpoints = {
	sm: '40em',
	md: '52em',
	lg: '64em',
	xl: '80em',
};

const theme = extendTheme({
	components: {
		Button,
		Input,
	},
	semanticTokens: {
		colors: {
			text: {
				default: '#16161D',
				_dark: '#ade3b8',
			},
			heroGradientStart: {
				default: '#7928CA',
				_dark: '#e3a7f9',
			},
			heroGradientEnd: {
				default: '#FF0080',
				_dark: '#fbec8f',
			},
		},
		radii: {
			button: '12px',
		},
	},
	colors: {
		black: '#16161D',
	},
	fonts: {
		heading: `'Lilita One', cursive`,
		body: `'Permanent Marker', cursive;`,
	},
	breakpoints,
	styles: {
		global: () => ({
			body: {
				bg: 'gray.400',
			},
		}),
	},
});

export default theme;
