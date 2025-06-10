import styles from './EmojiBadge.module.css';

function EmojiBadge({ data }) {
	const { emoji, count } = data;
	return (
		<div className={styles.emojiBadge}>
			<div className={styles.emoji}>{emoji}</div>
			<span className={styles.count}>{count}</span>
		</div>
	);
}

export default EmojiBadge;
