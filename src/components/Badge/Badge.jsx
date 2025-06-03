import styles from './Badge.module.css';

export function RelationBadge({ result }) {
	const { relationship } = result;

	return (
		<div className={styles[relationship]}>
			<span>{relationship}</span>
		</div>
	);
}

export function EmojiBadge({ data }) {
	const { emoji, count } = data;
	return (
		<div className={styles.emojiBadge}>
			<div className={styles.emoji}>{emoji}</div>
			<span className={styles.count}>{count}</span>
		</div>
	);
}
