import { Link } from 'react-router-dom';
import { useRef } from 'react';
import useCarouselScroll from '../../hooks/useCarouselScroll';
import Card from './Card';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './CardLists.module.css';

const CARD_GAP_REM = 29.5;

function CardLists({ cards }) {
	const { listRef, showPrevButton, showNextButton, scrollByCard } = useCarouselScroll(CARD_GAP_REM);
	return (
		<div className={styles.carouselWrapper}>
			{showPrevButton && (
				<button
					className={`${styles.navButton} ${styles.prevButton}`}
					onClick={() => scrollByCard('left')}
				>
					<FaChevronLeft />
				</button>
			)}
			<div className={styles.list} ref={listRef}>
				{cards.map(card => (
					<Link to={`/post/${card.id}`} key={card.id}>
						<Card data={card} />
					</Link>
				))}
			</div>
			{showNextButton && (
				<button
					className={`${styles.navButton} ${styles.nextButton}`}
					onClick={() => scrollByCard('right')}
				>
					<FaChevronRight />
				</button>
			)}
		</div>
	);
}

export default CardLists;
