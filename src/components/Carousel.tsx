import { FC, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface Images {
	slides: { secure_url: string; public_id: string }[];
}

export const Carousel: FC<Images> = ({ slides }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex);
	};

	return (
		<Box className='slider'>
			<Flex>
				<Box className='slider_container'>
					<Box
						className='slideWidthBackground'
						style={{
							backgroundImage: `url(${slides[currentIndex]?.secure_url})`,
						}}
					></Box>
					<Box className='dotsContainerStyles'>
						{slides.map((slide, slideIndex) => (
							<Box
								className='dotStyle'
								key={slide.public_id}
								onClick={() => goToSlide(slideIndex)}
							>
								●
							</Box>
						))}
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};
