// src/hooks/useCarouselScroll.js (새 파일)
import { useRef, useState, useEffect } from 'react';

const useCarouselScroll = gapValue => {
	const listRef = useRef(null);
	const [showPrevButton, setShowPrevButton] = useState(false);
	const [showNextButton, setShowNextButton] = useState(true);

	const calculateButtonVisibility = () => {
		const listElement = listRef.current;

		if (listElement) {
			const { scrollLeft, scrollWidth, clientWidth } = listElement;

			setShowPrevButton(scrollLeft > 5);

			setShowNextButton(scrollLeft + clientWidth < scrollWidth - 5);
		}
	};

	const scrollByCard = direction => {
		const listElement = listRef.current;
		if (listElement) {
			const firstCardLink = listElement.querySelector('a');
			if (!firstCardLink) return;

			const cardWidth = firstCardLink.offsetWidth;

			const scrollAmount = cardWidth + gapValue;

			if (direction === 'left') {
				listElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
			} else {
				listElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
			}
		}
	};

	useEffect(() => {
		const listElement = listRef.current;
		if (listElement) {
			listElement.addEventListener('scroll', calculateButtonVisibility);
			calculateButtonVisibility();

			const handleResize = () => calculateButtonVisibility();
			window.addEventListener('resize', handleResize);

			return () => {
				listElement.removeEventListener('scroll', calculateButtonVisibility);
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);

	return {
		listRef,
		showPrevButton,
		showNextButton,
		scrollByCard,
	};
};

export default useCarouselScroll;
