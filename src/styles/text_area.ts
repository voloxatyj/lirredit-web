import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Textarea: ComponentStyleConfig = {
	baseStyle: {
		fontSize: '10pt',
		minH: '150px',
		bg: 'gray.50',
		_placeholder: {
			color: 'gray.500',
		},
		_hover: {
			bg: 'white',
			border: '1px solid',
			borderColor: 'blue.500',
		},
		_focus: {
			outline: 'none',
			border: '1px solid',
			borderColor: 'blue.500',
		},
	},
	sizes: {
		md: {
			field: {
				height: '50px',
				fontSize: '14pt',
				borderRadius: '20px',
			},
		},
	},
	variants: {},
	defaultProps: {
		variant: null,
	},
};
