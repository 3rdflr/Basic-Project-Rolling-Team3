import styles from './TextInput.module.css';

function TextInput({ type, value, placeholder, onChange, error, errorMessage, onBlur }) {
	return (
		<div>
			<input
				className={`${styles.container} ${error && styles.error}`}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
		</div>
	);
}

export default TextInput;
