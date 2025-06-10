import React, { useEffect, useState } from 'react';
import { IoShareOutline } from 'react-icons/io5';
import styles from './ShareButton.module.css';
import { KAKAO_APP_KEY } from '../../../constants/endPoints';
import Toast from '../../Toast/Toast';

const ShareButton = ({ isOpen, toggleOpen }) => {
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init(KAKAO_APP_KEY);
			console.log('카카오 SDK 초기화 완료');
		}
	}, []);

	const handleKakaoShare = () => {
		if (window.Kakao) {
			window.Kakao.Share.sendDefault({
				objectType: 'text',
				text: '이것은 테스트 공유 메시지입니다!',
				link: {
					mobileWebUrl: window.location.href,
					webUrl: window.location.href,
				},
			});
		}
	};

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setShowToast(true);
		} catch (err) {
			console.error('URL 복사 실패:', err);
		}
	};

	return (
		<div className={styles.wrapper}>
			<button className={styles.sharebutton} onClick={toggleOpen}>
				<IoShareOutline className={styles.shareButtonIcon} />
			</button>
			{isOpen && (
				<ul className={styles.dropdown}>
					<li onClick={handleKakaoShare}>카카오톡 공유</li>
					<li onClick={handleCopyUrl}>URL 공유</li>
				</ul>
			)}
			{showToast && <Toast message="URL이 복사되었습니다." onClose={() => setShowToast(false)} />}
		</div>
	);
};

export default ShareButton;
