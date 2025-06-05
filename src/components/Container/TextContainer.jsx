import styles from './TextContainer.module.css';
import { useScreenSize } from '../../hooks/useScreenSize.jsx';

function TextContainer({ content, isReverse = false }) {
	const { header, title1, title2, description, img, alt } = content;
	const screenSize = useScreenSize();

	return (
		<div className={isReverse ? styles.reverse : styles.container}>
			<div className={styles.text}>
				<span className={styles.header}>{header}</span>
				<div className={styles.h1}>
					<h1>
						{title1}
						{screenSize === 'lg' && <br />}
						{title2}
					</h1>
				</div>
				<span className={styles.description}>{description}</span>
			</div>
			<img className={styles.img} src={img} alt={alt} />
		</div>
	);
}

export default TextContainer;
