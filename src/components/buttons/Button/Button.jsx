import styles from './Button.module.css';

function Button({ type = 'button', variant, children, linkTo, disabled = false, onClick }) {
	return (
		<button
			type={type}
			className={`${styles[variant]} ${disabled ? styles.disabled : ''}`}
			disabled={disabled}
			onClick={onClick}
		>
			<span>{children}</span>
		</button>
	);
}

export default Button;
