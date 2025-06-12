import React from 'react';
import styles from './MessageCardModal.module.css';
import { formatDate } from '../../utils/date';
import Button from '../buttons/Button/Button';
import ReactQuill from 'react-quill-new';
import classNames from 'classnames';

const MessageCardModal = ({ message, onClick, onClose }) => {
	const getRelationshipClass = relationship => {
		switch (relationship) {
			case '친구':
				return styles['relationship-friend'];
			case '가족':
				return styles['relationship-family'];
			case '동료':
				return styles['relationship-coworker'];
			case '지인':
				return styles['relationship-acquaintance'];
			default:
				return '';
		}
	};

	const getFontClass = font => {
		switch (font) {
			case 'Pretendard':
				return styles.fontPretendard;
			case 'Noto Sans':
				return styles.fontNotoSans;
			case '나눔손글씨 손편지체':
				return styles.fontNanumHandwriting;
			case '나눔명조':
				return styles.fontNanumMyeongjo;
			default:
				return '';
		}
	};

	return (
		<div className={styles.modalMessageCard} onClick={() => onClick?.(message)}>
			<div>
				<div className={styles.modalHeader}>
					<div className={styles.modalSenderProfile}>
						<img src={message.profileImageURL} alt="profile" className={styles.modalProfileImage} />
						<div className={styles.modalSenderInfo}>
							<p className={styles.modalSender}>From. {message.sender}</p>
							<span
								className={`${styles.modalRelationship} ${getRelationshipClass(
									message.relationship
								)}`}
							>
								{message.relationship}
							</span>
						</div>
					</div>
					<p className={styles.modalDate}>{formatDate(message.createdAt)}</p>
				</div>
				<ReactQuill
					value={message.content}
					readOnly={true}
					theme="bubble"
					modules={{ toolbar: false }}
					className={classNames(getFontClass(message.font), styles.reactQuillBubble)}
				/>
			</div>
			<Button variant="small" onClick={onClose} className={styles.modalButton}>
				확인
			</Button>
		</div>
	);
};

export default MessageCardModal;
