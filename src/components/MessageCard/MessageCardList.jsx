import React, { useEffect, useState } from 'react';
import styles from './MessageCardList.module.css';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router';
import Modal from '../Modal/Modal';
import MessageCard from './MessageCard';
import MessageCardModal from '../Modal/MessageCardModal';
import useDeleteRecipientMessage from '../../hooks/useDeleteRecipientMessage';

const MessageCardList = ({ messages, id, isEditMode, isLoadingMessagesCard }) => {
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [messagesState, setMessagesState] = useState(messages);

	const { deleteMessage } = useDeleteRecipientMessage();

	const handleDelete = async id => {
		try {
			await deleteMessage(id);
			setMessagesState(prev => prev.filter(msg => msg.id !== id));
		} catch (err) {
			alert('삭제에 실패했습니다.');
		}
	};

	const openModal = message => {
		setSelectedMessage(message);
	};

	const closeModal = () => {
		setSelectedMessage(null);
	};

	return (
		<div className={styles.messageList}>
			<Link to={`/post/${id}/message`} className={styles.addMessage}>
				<FaCirclePlus className={styles.addButton} />
			</Link>
			{messagesState?.map(msg => (
				<MessageCard
					key={msg.id}
					message={msg}
					onClick={openModal}
					onDelete={handleDelete}
					isEditMode={isEditMode}
					isLoadingMessagesCard={isLoadingMessagesCard}
				/>
			))}
			{selectedMessage && (
				<Modal onClose={closeModal}>
					<MessageCardModal message={selectedMessage} onClose={closeModal} />
				</Modal>
			)}
		</div>
	);
};

export default MessageCardList;
