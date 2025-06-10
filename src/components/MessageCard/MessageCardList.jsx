import React, { useState } from 'react';
import styles from './MessageCardList.module.css';
import { FaCirclePlus } from 'react-icons/fa6';
import { Link } from 'react-router';
import Modal from '../Modal/Modal';
import MessageCard from './MessageCard';
import MessageCardModal from '../Modal/MessageCardModal';

const MessageCardList = ({ messages, id }) => {
	const [selectedMessage, setSelectedMessage] = useState(null);

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
			{messages.map(message => (
				<MessageCard key={message.id} message={message} onClick={openModal} />
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
