import React from 'react';
import ShareButton from '../../buttons/ShareButton/ShareButton';
import BadgeList from '../../BadgeList/BadgeList';
import AddEmojiButton from '../../buttons/AddEmojiButton/AddEmojiButton';

import styles from './RecipientHeader.module.css';

const RecipientHeader = ({ name, topReactions, allReactions, recipientId, onReactionAdded }) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.recipient}>To. {name}</h1>
			<div className={styles.headerItems}>
				<BadgeList topReactions={topReactions} allReactions={allReactions} />
				<AddEmojiButton recipientId={recipientId} onReactionAdded={onReactionAdded} />
				<ShareButton />
			</div>
		</div>
	);
};

export default RecipientHeader;
