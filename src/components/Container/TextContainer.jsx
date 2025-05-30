import styles from './TextContainer.module.css';
import { useScreenSize } from '../../hooks/useScreenSize.jsx';

function TextContainer({ content, isReverse = false }) {
	const { point, title1, title2, span, img, alt } = content;
	const screenSize = useScreenSize();

	return (
		<div className={isReverse ? styles.reverse : styles.container}>
			<div className={styles.text}>
				<span className={styles.point}>{point}</span>
				<div className={styles.h1}>
					<h1>
						{title1}
						{screenSize === 'lg' && <br />}
						{title2}
					</h1>
				</div>
				<span className={styles.span}>{span}</span>
			</div>
			<img className={styles.img} src={img} alt={alt} />
		</div>
	);
}

export default TextContainer;
