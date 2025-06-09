import React from 'react';
import styles from './MessageCard.module.css';
import { formatDate } from '@/utils/date';

const MessageCard = ({ message, onClick }) => {
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
		<div className={styles.messageCard} onClick={() => onClick?.(message)}>
			<div className={styles.senderProfile}>
				<img src={message.profileImageURL} alt="profile" className={styles.profileImage} />
				<div className={styles.senderInfo}>
					<p className={styles.sender}>From. {message.sender}</p>
					<span className={`${styles.relationship} ${getRelationshipClass(message.relationship)}`}>
						{message.relationship}
					</span>
				</div>
			</div>
			<ReactQuill
				value={message.content}
				readOnly={true}
				theme="bubble"
				modules={{ toolbar: false }}
			/>
			<p className={styles.date}>{formatDate(message.createdAt)}</p>
		</div>
	);
};

export default MessageCard;
