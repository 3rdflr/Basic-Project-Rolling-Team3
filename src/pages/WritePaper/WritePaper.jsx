import { useState } from 'react';
import Header from '../../components/headers/Header/Header';
import TextInput from '../../components/TextField/TextInput';
import TextDropdown from '../../components/TextField/TextDropdown';
import BackgroundSelector from '../../components/buttons/BackgroundSelector/BackgroundSelector';
import Button from '../../components/buttons/Button/Button';
import styles from './WritePaper.module.css';

function WritePaper() {
	const [text, setText] = useState('');
	const options = ['Option 1', 'Option 2', 'Option 3'];
	const [selectedOption, setSelectedOption] = useState(options[0]);

	return (
		<>
			<Header />
			<h2>To</h2>
			<TextInput
				className={styles.input}
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="내용을 입력해주세요"
			/>
			<TextDropdown options={options} value={selectedOption} onChange={setSelectedOption} />
			<BackgroundSelector />
			<Button />
		</>
	);
}

export default WritePaper;
