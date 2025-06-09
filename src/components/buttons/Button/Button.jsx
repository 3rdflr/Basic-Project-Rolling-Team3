import styles from './Button.module.css';

function Button({ type = 'button', style, text, linkTo, disabled = false }) {
	return (
		<button
			type={type}
			className={`${styles[style]} ${disabled ? styles.disabled : ''}`}
			disabled={disabled}
		>
			<span>{children}</span>
		</button>
	);
}

export default Button;
