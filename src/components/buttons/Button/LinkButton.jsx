import { Link } from 'react-router';
import styles from './LInkButton.module.css';

function LinkButton({ variant, children, linkTo }) {
	return (
		<Link className={styles[variant]} to={linkTo}>
			{children}
		</Link>
	);
}

export default LinkButton;
