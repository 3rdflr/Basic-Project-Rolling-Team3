import React from 'react';
import styles from './MessageCard.module.css';

const MessageCard = ({ message, onClick, className = '', disableClick = false }) => {
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
		<div
			className={`${styles.messageCard} ${className}`}
			onClick={!disableClick ? () => onClick?.(message) : undefined}
		>
			<div className={styles.senderProfile}>
				<img src={message.profileImageURL} alt="profile" className={styles.profileImage} />
				<div className={styles.senderInfo}>
					<p className={styles.sender}>From. {message.sender}</p>
					<span className={`${styles.relationship} ${getRelationshipClass(message.relationship)}`}>
						{message.relationship}
					</span>
				</div>
			</div>
			<p className={styles.messageContent}>{message.content}</p>
			<p className={styles.date}>{message.createdAt}</p>
		</div>
	);
};

export default MessageCard;
