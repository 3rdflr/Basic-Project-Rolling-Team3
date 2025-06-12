import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Header from '../../components/headers/Header/Header';
import TextInput from '../../components/TextField/TextInput';
import BackgroundSelector from '../../components/buttons/BackgroundSelector/BackgroundSelector';
import Button from '../../components/buttons/Button/Button';
import styles from './WritePaper.module.css';
import useFetch from '../../hooks/useFetch';
import { recipientsAPI } from '../../api/index.js';
import { TEAM } from '../../constants/endPoints';
import { useNavigate } from 'react-router';
import { useScreenSize } from '../../hooks/useScreenSize';

function WritePaper() {
	const [name, setName] = useState('');
	const [selectedTab, setSelectedTab] = useState('color');
	const [selectedValue, setSelectedValue] = useState({
		backgroundColor: 'beige',
		backgroundImageURL: '',
	});

	const screenSize = useScreenSize();
	const buttonSize = screenSize === 'sm' ? 'primary' : name.trim() ? 'large' : 'largeDisabled';

	const [nameError, setNameError] = useState(false);

	const navigate = useNavigate();

	const [isLoading, isError, createRecipient] = useFetch(recipientsAPI.createRecipients);
	const handleSubmit = async e => {
		e.preventDefault();

		if (name.trim().length < 1 || name.trim().length > 40) {
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
			const newPostId = response.id || response.data?.id;
			navigate(`/post/${newPostId}`);
		} catch (error) {
			console.error('에러:', error);
			alert('롤링페이퍼 생성에 실패하였습니다.');
		}

		console.log('formData', formData);
	};

	return (
		<>
			<Helmet>
				<title>Rolling | Post</title>
			</Helmet>
			<Header isForm={true} />
			<div className={styles.container}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputarea}>
						<h2 className={styles.h2}>To.</h2>
						<div className={styles.inputContainer}>
							<TextInput
								className={styles.input}
								value={name}
								onChange={e => {
									const value = e.target.value;
									setName(value);
									if (value.trim().length < 1) {
										setNameError(true);
									} else {
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
								maxLength={40}
							/>
							<span className={styles.charCount}>{name.length} / 40</span>
						</div>
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
						<Button
							type="submit"
							variant={buttonSize}
							children="생성하기"
							disabled={!name.trim()}
						/>
					</div>
				</form>
			</div>
		</>
	);
}

export default WritePaper;
