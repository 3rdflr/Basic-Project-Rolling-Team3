import { Link } from 'react-router';

import styles from './Button.module.css';

function Button({ type = 'button', style, text, linkTo }) {
	return (
		<button type={type} className={styles[style]}>
			{type === 'submit' ? <span>{text}</span> : <Link to={linkTo}>{text}</Link>}
		</button>
	);
}

export default Button;
