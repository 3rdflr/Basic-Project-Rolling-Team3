import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { recipientsAPI } from '../../../api';
import AddEmojiIcon from '../../../assets/icons/AddEmojiIcon.svg';

import styles from './AddEmojiButton.module.css';

const AddEmojiButton = ({ recipientId, onReactionAdded, isOpen, toggleOpen }) => {
	const handleEmojiClick = async emojiData => {
		try {
			const body = {
				emoji: emojiData.emoji,
				type: 'increase',
			};
			await recipientsAPI.createRecipientsReaction(recipientId, body);

			onReactionAdded?.();
		} catch (error) {
			console.error('이모지 추가 실패:', error);
		}
	};

	return (
		<div className={styles.container}>
			<button className={styles.addButton} onClick={toggleOpen}>
				<img src={AddEmojiIcon} alt="이모지 추가 아이콘" />{' '}
				<span className={styles.buttonText}>추가</span>
			</button>
			{isOpen && (
				<div className={styles.pickerWrapper}>
					<EmojiPicker onEmojiClick={handleEmojiClick} />
				</div>
			)}
		</div>
	);
};

export default AddEmojiButton;
