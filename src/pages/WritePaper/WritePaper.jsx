import { useState } from 'react';
import TextInput from '../../components/TextField/TextInput';
import TextDropdown from '../../components/TextField/TextDropdown';
import BackgroundSelector from '../../components/buttons/BackgroundSelector/BackgroundSelector';

function WritePaper() {
	const [text, setText] = useState('');
	const options = ['Option 1', 'Option 2', 'Option 3'];
	const [selectedOption, setSelectedOption] = useState(options[0]);

	return (
		<>
			<TextInput
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="내용을 입력해주세요"
			/>
			<TextDropdown options={options} value={selectedOption} onChange={setSelectedOption} />
			<BackgroundSelector />
		</>
	);
}

export default WritePaper;
