import React from 'react';
import styles from './MessageCard.module.css';
import { formatDate } from '@/utils/date';
import ReactQuill from 'react-quill-new';
import { FaRegTrashCan } from 'react-icons/fa6';
import classNames from 'classnames';

const MessageCard = ({ message, onClick, onDelete, isEditMode }) => {
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
		<div className={styles.messageCard}>
			<div>
				<div className={styles.senderProfile}>
					<img src={message.profileImageURL} alt="profile" className={styles.profileImage} />
					<div className={styles.senderInfo}>
						<p className={styles.sender}>From. {message.sender}</p>
						<span
							className={`${styles.relationship} ${getRelationshipClass(message.relationship)}`}
						>
							{message.relationship}
						</span>
					</div>
					{isEditMode && (
						<button className={styles.deleteButton} onClick={() => onDelete(message.id)}>
							<FaRegTrashCan />
						</button>
					)}
				</div>
				<ReactQuill
					value={message.content}
					readOnly={true}
					theme="bubble"
					modules={{ toolbar: false }}
					className={classNames(getFontClass(message.font), styles.reactQuillBubble)}
				/>
			</div>

			<div className={styles.footer}>
				<p className={styles.date}>{formatDate(message.createdAt)}</p>
				<p className={styles.viewDetail} onClick={() => onClick?.(message)}>
					자세히 보기
				</p>
			</div>
		</div>
	);
};

export default MessageCard;
