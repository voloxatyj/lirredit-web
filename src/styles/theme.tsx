/* eslint-disable camelcase */
import { extendTheme } from '@chakra-ui/react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './text_area';

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
		Textarea,
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
		primary_main: '#3B82F6',
		primary_900: '#1E3A8A',
		primary_800: '#1E40AF',
		primary_700: '#1D4ED8',
		primary_600: '#2563EB',
		primary_500: '#3B82F6',
		primary_400: '#60A5FA',
		primary_300: '#93C5FD',
		primary_200: '#BFDBFE',
		primary_100: '#DBEAFE',
		primary_50: '#EFF6FF',

		success_main: '#10B981',
		success_900: '#064E3B',
		success_700: '#047857',
		success_500: '#10B981',
		success_300: '#6EE7B7',
		success_100: '#D1FAE5',
		success_50: '#ECFDF5',

		yellow_main: '#EAB308',
		yellow_900: '#713F12',
		yellow_700: '#A16207',
		yellow_500: '#EAB308',
		yellow_300: '#FDE047',
		yellow_100: '#FEF9C3',
		yellow_50: '#FEFCE8',

		purple_main: '#8B5CF6',
		purple_900: '#581C87',
		purple_700: '#6D28D9',
		purple_500: '#8B5CF6',
		purple_300: '#C4B5FD',
		purple_100: '#EDE9FE',
		purple_50: '#F5F3FF',

		orange_main: '#F97316',
		orange_900: '#7C2D12',
		orange_700: '#C2410C',
		orange_500: '#F97316',
		orange_300: '#FDBA74',
		orange_100: '#FFEDD5',
		orange_50: '#FFF7ED',

		error_900: '#7F1D1D',
		error_700: '#B91C1C',
		error_500: '#EF4444',
		error_300: '#FCA5A5',
		error_100: '#FEE2E2',
		error_50: '#FEF2F2',

		neutral_main: '#A0AEC0',
		neutral_900: '#1A202C',
		neutral_800: '#2D3748',
		neutral_700: '#4A5568',
		neutral_600: '#718096',
		neutral_500: '#A0AEC0',
		neutral_400: '#CBD5E0',
		neutral_300: '#E2E8F0',
		neutral_200: '#EDF2F7',
		neutral_100: '#F7FAFC',

		back_header: '#FFFFFF',
		back_body: '#F5F8FB',
		back_uncoverRow: '#FBFDFE',
		logo_yellow: '#FFD41D',

		text_main: '#1c1c1c',
		text_secondary: '#99a3ab',
		text_hover: '#4da4a1',

		palette_white: '#ffffff',
		palette_whiteHover: '#f2f5f8',

		header_width: '64px',
		toolbar_height: '56px',
		background_color: 'white',
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
