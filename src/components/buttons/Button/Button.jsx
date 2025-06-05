import { Link } from 'react-router';

import styles from './Button.module.css';

function Button({ type = 'button', classStyle, children, linkTo }) {
	return (
		<button type={type} className={styles[classStyle]}>
			{type === 'submit' ? <span>{children}</span> : <Link to={linkTo}>{children}</Link>}
		</button>
	);
}

export default Button;
