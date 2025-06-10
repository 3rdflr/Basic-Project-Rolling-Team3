import styles from './Button.module.css';
import classNames from 'classnames';

function Button({
	type = 'button',
	classStyle,
	size,
	children,
	linkTo,
	disabled = false,
	onClick,
	className,
}) {
	const buttonClass = classNames(
		styles.button,
		styles[classStyle],
		styles[size],
		{ [styles.disabled]: disabled },
		className
	);
	return (
		<button type={type} className={buttonClass} disabled={disabled} onClick={onClick}>
			<span>{children}</span>
		</button>
	);
}

export default Button;
