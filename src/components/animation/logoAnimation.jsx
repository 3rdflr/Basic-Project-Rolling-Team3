import * as motion from 'motion/react-client';
import img from '../../assets/icons/logo.svg';
import styles from './logoAnimation.module.css';

export default function Keyframes() {
	return (
		<div className={styles.container}>
			<motion.div
				className={styles.img}
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{
					duration: 1,
					ease: 'easeInOut',
					scale: {
						type: 'spring',
						repeat: Infinity,
						duration: 1.5,
						bounce: 0.6,
						reapatType: 'mirror',
					},
				}}
				style={box}
			/>
		</div>
	);
}

/**
 * ==============   Styles   ================
 */

const box = {
	width: 212,
	height: 60,
	backgroundImage: `url(${img})`,
};
