import React from 'react';
import styles from './MessageCardModal.module.css';
import { formatDate } from '../../utils/date';
import Button from '../buttons/Button/Button';
import ReactQuill from 'react-quill-new';

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
					className={styles.reactQuillBubble}
				/>
			</div>
			<Button size="small" onClick={onClose} className={styles.modalButton}>
				확인
			</Button>
		</div>
	);
};

export default MessageCardModal;
