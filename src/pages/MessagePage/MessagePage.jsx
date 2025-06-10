import { useState, useEffect } from 'react';
import styles from './MessagesPage.module.css';
import Header from '../../components/headers/Header/Header';
import TextDropdown from '../../components/TextField/TextDropdown';
import TextInput from '../../components/TextField/TextInput';
import useFetch from '../../hooks/useFetch';
import { imagesAPI } from '../../api';
import Button from '../../components/buttons/Button/Button';
import Keyframes from '../../components/animation/logoAnimation';
import { TEAM } from '../../constants/endPoints';
import { recipientsAPI } from '../../api/index.js';
import { useParams } from 'react-router-dom';
import TextEditor from '../../components/TextEditor/TextEditor.jsx';


function MessagePage() {
	const [sender, setSender] = useState('');
	const [senderError, setSenderError] = useState(false);
	const relationship = ['친구', '지인', '동료', '가족'];
	const [selectedRelationship, setSelectedRelationship] = useState(relationship[0]);
	const font = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];
	const [selectedFont, setSelectedFont] = useState(font[0]);

	const [profileImages, setProfileImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);

	const [isLoading, error, fetchProfiles] = useFetch(imagesAPI.getProfiles);

	const [isUploading, uploadError, postMessage] = useFetch(recipientsAPI.createRecipientsMessage);

	const { id } = useParams();

	const [content, setContent] = useState('');
  
	console.log(id);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const images = await fetchProfiles();
				setProfileImages(images);

				if (images.length > 1) {
					const randomIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
					setSelectedImage(images[randomIndex]);
				}
			} catch (error) {
				console.error('프로필 이미지 불러오기 실패:', error);
			}
		};

		fetchData();
	}, [fetchProfiles]);

	//로딩 작동하는지 다시 확인해봐야함.
	if (isLoading) {
		return (
			<div className={styles.loading}>
				<Keyframes />
			</div>
		);
	}

	const handleSubmit = async e => {
		e.preventDefault();

		if (!sender.trim()) {
			setSenderError(true);
			return;
		}
		try {
			const recipientId = id;
			const data = {
				team: TEAM,
				recipientId: recipientId,
				sender: sender,
				profileImageURL: selectedImage,
				relationship: selectedRelationship,
				content: content, // 수정해야함
				font: selectedFont,
			};
			await postMessage(recipientId, data);
			console.log('메세지가 전송되었습니다!', data); // 토스트로 변경할 수도 있음.
		} catch (err) {
			console.error('메세지 전송 실패:', err);
		}
	};

	return (
		<>
			<Header isForm={true} />
			<div className={styles.container}>
				<form onSubmit={handleSubmit}>
					<h2 className={styles.h2}>From</h2>
					<TextInput
						value={sender}
						placeholder={'이름을 입력해 주세요.'}
						onChange={e => {
							setSender(e.target.value);
							if (senderError && e.target.value.trim()) {
								setSenderError(false);
							}
						}}
						onBlur={e => {
							if (!e.target.value.trim()) {
								setSenderError(true);
							}
						}}
						error={senderError}
						errorMessage={'1~40자 사이 이름을 입력해주세요'}
					/>
					<h2 className={styles.h2}>프로필 이미지</h2>
					<p className={styles.p}>프로필 이미지를 선택해주세요!</p>
					<div className={styles.wrapper}>
						<div className={styles.profilepreview}>
							{/* 선택된 이미지 크게 보여주기(왼쪽에 위치하도록) */}
							{selectedImage && (
								<div className={styles.selectedimage}>
									<img src={selectedImage} alt="선택된 이미지" />
								</div>
							)}
						</div>

						<div className={styles.profilethumbnails}>
							{/* 9개 썸네일 두 줄로 보여주기 */}
							{profileImages.map(
								(img, index) =>
									index !== 0 && (
										<div
											key={index}
											className={`${styles.thumbnail} ${
												selectedImage === img ? styles.selected : ''
											}`}
											onClick={() => setSelectedImage(img)}
										>
											<img className={styles.thumbnail} src={img} alt={`프로필 ${index}`} />
										</div>
									)
							)}
						</div>
					</div>
					<h2 className={styles.h2}>상대와의 관계</h2>
					<TextDropdown
						options={relationship}
						value={selectedRelationship}
						onChange={setSelectedRelationship}
					/>
					<h2 className={styles.h2}>내용을 입력해 주세요</h2>
					<TextEditor value={content} onChange={setContent} />
					<h2 className={styles.h2}>폰트 선택</h2>
					<TextDropdown options={font} value={selectedFont} onChange={setSelectedFont} />
					<Button
						type="submit"
						classStyle="primary"
						children="생성하기"
						disabled={!sender.trim()}
					/>
				</form>
			</div>
		</>
	);
}
export default MessagePage;
