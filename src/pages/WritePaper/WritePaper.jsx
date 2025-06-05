import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { recipientsAPI } from '../../api/index.js';
import { TEAM } from '../../constants/endPoints';
// import Header from '../../components/headers/Header/Header';
import TextInput from '../../components/TextField/TextInput';
import BackgroundSelector from '../../components/buttons/BackgroundSelector/BackgroundSelector';
import Button from '../../components/buttons/Button/Button';
import styles from './WritePaper.module.css';

function WritePaper() {
	const [name, setName] = useState('');
	const [selectedTab, setSelectedTab] = useState('color');
	const [selectedValue, setSelectedValue] = useState({
		backgroundColor: 'beige', // 오류 막기 위해 넣어둠 협의 후 변경해야함.
		backgroundImageURL: '',
	});
	const [nameError, setNameError] = useState(false);

	const [isLoading, isError, createRecipient] = useFetch(recipientsAPI.createRecipients);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!name.trim()) {
			setNameError(true);
			return;
		}
		setNameError(false);
		const formData = {
			team: { TEAM },
			name: name.trim(),
		};
		if (selectedTab === 'color') {
			// 1️ 컬러 선택 상태
			formData.backgroundColor = selectedValue.backgroundColor || 'beige';
			formData.backgroundImageURL = null;
		} else if (selectedTab === 'image') {
			// 2️ 이미지 선택 상태
			formData.backgroundColor = 'beige';
			if (selectedValue.backgroundImageURL) {
				// 2-1 이미지 선택된 경우
				formData.backgroundImageURL = selectedValue.backgroundImageURL;
			} else {
				// 2-2 이미지 선택 안 된 경우
				formData.backgroundImageURL = 'https://picsum.photos/id/683/3840/2160';
			}
		}

		try {
			const response = await createRecipient(formData);
			console.log('성공:', response);
		} catch (error) {
			console.error('에러:', error);
		}

		console.log('formData', formData);
	};

	return (
		<div className={styles.container}>
			{/* <Header isForm={true} /> */}
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.inputarea}>
					<h2 className={styles.h2}>To</h2>
					<TextInput
						className={styles.input}
						value={name}
						onChange={e => {
							setName(e.target.value);
							if (nameError && e.target.value.trim()) {
								setNameError(false);
							}
						}}
						onBlur={e => {
							if (!e.target.value.trim()) {
								setNameError(true);
							}
						}}
						placeholder="받는 사람 이름을 입력해 주세요"
						error={nameError}
						errorMessage="1~40자 사이 이름을 입력해주세요"
					/>
				</div>
				<div className={styles.backgroundselectortext}>
					<h2 className={styles.h2}>배경화면을 선택해 주세요.</h2>
					<p className={styles.p}>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
				</div>
				<div className={styles.backgroundselector}>
					<BackgroundSelector
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
						onSelect={selectedValue => setSelectedValue(selectedValue)}
					/>
				</div>
				<div className={styles.button}>
					<Button type="submit" style="primary" text="생성하기" disabled={!name.trim()} />
				</div>
			</form>
		</div>
	);
}

export default WritePaper;
