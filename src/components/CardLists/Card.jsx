import { EmojiBadge } from '../Badge/Badge';
import ProfileImg from '../Badge/ProfileImg';

import beige from '../../assets/images/beige.svg';
import blue from '../../assets/images/blue.svg';
import green from '../../assets/images/green.svg';
import purple from '../../assets/images/purple.svg';

import styles from './Card.module.css';

function Card({ data }) {
	const { name, backgroundColor, backgroundImageURL, messageCount, recentMessages, topReactions } =
		data;

	const cardStyle = {};
	let cardClassName = styles.card;

	if (backgroundImageURL) {
		cardStyle['--card-background-image'] = `url(${backgroundImageURL})`;
	} else {
		cardClassName += ` ${styles.noImage}`;
		cardStyle['--card-background-color'] = `var(--${backgroundColor}-200)`;
	}
	return (
		<>
			<div className={cardClassName} style={cardStyle}>
				<div>
					<div className={styles.cardText}>
						{backgroundImageURL ? (
							<h1 className={styles.nameInherit}>To. {name}</h1>
						) : (
							<h1 className={styles.name}>To. {name}</h1>
						)}
						<ProfileImg count={messageCount} data={recentMessages} />
						{backgroundImageURL ? (
							<span className={styles.countTextInherit}>
								<span className={styles.count}>{messageCount}</span>명이 작성했어요!
							</span>
						) : (
							<span className={styles.countText}>
								<span className={styles.count}>{messageCount}</span>명이 작성했어요!
							</span>
						)}
					</div>
					<div className={styles.badge}>
						{topReactions.map(emoji => (
							<EmojiBadge data={emoji} key={emoji.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
