import styles from './Button.module.css';

function Button({
	type = 'button',
	classStyle,
	extraClass,
	children,
	linkTo,
	disabled = false,
	onClick,
}) {
	return (
		<button
			type={type}
			className={`${styles[classStyle]} ${extraClass ? styles[extraClass] : ''} ${
				disabled ? styles.disabled : ''
			}`}
			disabled={disabled}
			onClick={onClick}
		>
			<span>{children}</span>
		</button>
	);
}

export default Button;
