import { useState } from 'react';
import axios from 'axios';
// import Header from '../../components/headers/Header/Header';
import TextInput from '../../components/TextField/TextInput';
import BackgroundSelector from '../../components/buttons/BackgroundSelector/BackgroundSelector';
import Button from '../../components/buttons/Button/Button';
import styles from './WritePaper.module.css';

function WritePaper() {
	const [name, setName] = useState('');
	const [selectedTab, setSelectedTab] = useState('color');
	const [selectedValue, setSelectedValue] = useState({
		backgroundColor: 'beige',
		backgroundImageURL: '',
	});

	const handleSubmit = async e => {
		e.preventDefault();

		const generationTeam = '16-3';
		const formData = {
			team: '16-3',
			name: name.trim(),
		};
		if (selectedValue.backgroundImageURL) {
			formData.backgroundImageURL = selectedValue.backgroundImageURL;
			formData.backgroundColor = null;
		} else if (selectedValue.backgroundColor) {
			formData.backgroundColor = selectedValue.backgroundColor || 'beige';
			formData.backgroundImageURL = null;
		} else {
			if (selectedTab === 'image') {
				formData.backgroundImageURL = 'https://picsum.photos/id/683/3840/2160';
				formData.backgroundColor = null;
			} else if (selectedTab === 'color') {
				formData.backgroundColor = 'beige';
				formData.backgroundImageURL = null;
			}
		}

		// if (selectedTab === 'image') {
		// 	formData.backgroundColor = null;
		// } else if (selectedTab === 'color') {
		// 	formData.backgroundImageURL = null;
		// }

		try {
			const response = await axios.post(
				`https://rolling-api.vercel.app/${generationTeam}/recipients/`,
				formData
			);
			console.log('성공:', response.data);
		} catch (error) {
			console.error('에러:', error);
		}

		console.log('formData', formData);
	};

	return (
		<>
			{/* <Header isForm={false} /> */}
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className={styles.h2}>To</h2>
				<TextInput
					className={styles.input}
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="받는 사람 이름을 입력해 주세요"
				/>
				<h2 className={styles.h2}>배경화면을 선택해 주세요.</h2>
				<p className={styles.p}>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
				<div>
					<BackgroundSelector
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
						onSelect={selectedValue => setSelectedValue(selectedValue)}
					/>
				</div>
				<div>
					<Button type="submit" style="primary" text="생성하기" />
				</div>
			</form>
		</>
	);
}

export default WritePaper;
