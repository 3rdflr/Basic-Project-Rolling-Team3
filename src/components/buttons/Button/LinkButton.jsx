import { Link } from 'react-router';
import styles from './LinkButton.module.css';

function LinkButton({ classStyle, children, linkTo }) {
	return (
		<Link className={styles[classStyle]} to={linkTo}>
			{children}
		</Link>
	);
}

export default LinkButton;
