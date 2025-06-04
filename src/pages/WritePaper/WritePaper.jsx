import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/headers/Header/Header';
import TextInput from '../../components/TextField/TextInput';
import BackgroundSelector from '../../components/buttons/BackgroundSelector/BackgroundSelector';
import Button from '../../components/buttons/Button/Button';
import styles from './WritePaper.module.css';

function WritePaper() {
	const [name, setName] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');
	const [backgroundImageURL, setBackgroundImageURL] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		const generationTeam = '16-3';
		const teamId = '3';
		const formData = {
			team: teamId,
			name: name.trim(),
		};

		if (backgroundColor) {
			formData.backgroundColor = backgroundColor;
		}

		if (backgroundImageURL) {
			formData.backgroundImageURL = backgroundImageURL;
		}
		try {
			// POST 요청 보내기(api 변수 수정시 수정할 것!)
			const response = await axios.post(
				`https://rolling-api.vercel.app/${generationTeam}/${teamId}/recipients/`,
				formData
			);
			console.log('성공:', response.data);
			// TODO: 성공 시 알림, 페이지 이동, 토스트 메시지 등 처리(토스트 연결 가능한지 회의해봐야함)
		} catch (error) {
			console.error('에러:', error);
			// TODO: 에러 토스트 띄우기 or 메시지 처리
		}
	};

	return (
		<>
			<Header isForm={false} />
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
						className={styles.selector}
						onSelectColor={setBackgroundColor}
						onSelectImage={setBackgroundImageURL}
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
