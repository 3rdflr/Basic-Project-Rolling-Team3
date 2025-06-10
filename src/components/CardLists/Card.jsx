import EmojiBadge from '../Badge/EmojiBadge';
import ProfileImg from '../Badge/ProfileImg';
import classNames from 'classnames';

import styles from './Card.module.css';

function Card({ data }) {
	const { name, backgroundColor, backgroundImageURL, messageCount, recentMessages, topReactions } =
		data;

	const cardStyle = backgroundImageURL
		? { '--card-background-image': `url(${backgroundImageURL})` }
		: {
				'--card-background-color': `var(--${backgroundColor}-200)`,
		  };

	let cardClassName = classNames(styles.card, {
		[styles[backgroundColor]]: !backgroundImageURL,
	});

	return (
		<>
			<div className={cardClassName} style={cardStyle}>
				<div>
					<div className={styles.cardText}>
						<h1 className={backgroundImageURL ? styles.nameWhite : styles.name}>
							To. {name.length <= 8 ? name : `${name.slice(0, 7)}...`}
						</h1>
						<ProfileImg count={messageCount} data={recentMessages} />
						<span className={backgroundImageURL ? styles.countTextWhite : styles.countText}>
							<span className={styles.count}>{messageCount}</span>명이 작성했어요!
						</span>
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
