import React, { useEffect, useRef, useState } from 'react';
import { IoShareOutline } from 'react-icons/io5';
import styles from './ShareButton.module.css';
import { KAKAO_APP_KEY } from '../../../constants/endPoints';

const ShareButton = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setOpen(prev => !prev);

	useEffect(() => {
		const handleClickOutside = e => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

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

	return (
		<div className={styles.wrapper}>
			<div className={styles.sharebutton} onClick={toggleDropdown}>
				<IoShareOutline />
			</div>
			{open && (
				<ul className={styles.dropdawn}>
					<li onClick={handleKakaoShare}>카카오톡 공유</li>
					<li>URL 공유</li>
				</ul>
			)}
		</div>
	);
};

export default ShareButton;
