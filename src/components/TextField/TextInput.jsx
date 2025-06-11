import styles from './TextInput.module.css';

function TextInput({ type, value, placeholder, onChange, error, errorMessage, onBlur, maxLength }) {
	return (
		<div>
			<input
				className={`${styles.container} ${error && styles.error}`}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				maxLength={40}
			/>
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
		</div>
	);
}

export default TextInput;
