import { Link } from 'react-router';

import styles from './Button.module.css';

function Button({ type = 'button', style, text, linkTo, disabled = false }) {
	return (
		<button
			type={type}
			className={`${styles[style]} ${disabled ? styles.disabled : ''}`}
			disabled={disabled}
		>
			{type === 'submit' ? <span>{text}</span> : <Link to={linkTo}>{text}</Link>}
		</button>
	);
}

export default Button;
