import React, { useState, useEffect } from 'react';
import CompletedIcon from '../../assets/icons/CompletedIcon.png';
import CloseIcon from '../../assets/icons/CloseIcon.svg';
import styles from './Toast.module.css';

const Toast = ({ message, duration = 5000, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div className={styles.toast}>
			<div className={styles.wrapper}>
				<img src={CompletedIcon} alt="완료 아이콘" className={styles.completedIcon} />
				{message}
			</div>
			<img src={CloseIcon} alt="닫기 아이콘" className={styles.closeIcon} onClick={onClose} />
		</div>
	);
};

export default Toast;
