import styles from './Button.module.css';

function Button({ type = 'button', classStyle, children, linkTo, disabled = false }) {
	return (
		<button
			type={type}
			className={`${styles[classStyle]} ${disabled ? styles.disabled : ''}`}
			disabled={disabled}
		>
			<span>{children}</span>
		</button>
	);
}

export default Button;
