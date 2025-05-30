import styles from './TextField.module.css';

function TextInput({ type, value, placeholder, onChange, error }) {
	return (
		<div>
			<input
				className={styles.input}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{error && <div className={styles.error}>유효성 검사 글귀 들어가는 곳</div>}
		</div>
	);
}

export default TextInput;
