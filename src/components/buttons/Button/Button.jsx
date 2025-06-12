import styles from './Button.module.css';
import classNames from 'classnames';

function Button({
	type = 'button',
	variant,
	children,
	linkTo,
	disabled = false,
	onClick,
	className,
}) {
	const buttonClass = classNames(styles[variant], { [styles.disabled]: disabled }, className);
	return (
		<button type={type} className={buttonClass} disabled={disabled} onClick={onClick}>
			<span>{children}</span>
		</button>
	);
}

export default Button;
