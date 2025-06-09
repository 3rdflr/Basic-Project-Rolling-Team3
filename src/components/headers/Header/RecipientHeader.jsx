import React, { useRef, useState } from 'react';
import ShareButton from '../../buttons/ShareButton/ShareButton';
import BadgeList from '../../BadgeList/BadgeList';
import AddEmojiButton from '../../buttons/AddEmojiButton/AddEmojiButton';
import useClickOutside from '../../../hooks/useClickOutside';

import styles from './RecipientHeader.module.css';

const RecipientHeader = ({ name, topReactions, allReactions, recipientId, onReactionAdded }) => {
	const [openToggle, setOpenToggle] = useState(false);
	const dropdownRef = useRef(false);

	useClickOutside(dropdownRef, () => setOpenToggle(false));

	const handleToggle = name => {
		setOpenToggle(prev => (prev === name ? false : name));
	};

	return (
		<div className={styles.header}>
			<h1 className={styles.recipient}>To. {name}</h1>
			<div className={styles.headerItems} ref={dropdownRef}>
				<BadgeList
					topReactions={topReactions}
					allReactions={allReactions}
					isOpen={openToggle === 'badge'}
					toggleOpen={() => handleToggle('badge')}
				/>
				<AddEmojiButton
					recipientId={recipientId}
					onReactionAdded={onReactionAdded}
					isOpen={openToggle === 'emoji'}
					toggleOpen={() => handleToggle('emoji')}
				/>
				<ShareButton isOpen={openToggle === 'share'} toggleOpen={() => handleToggle('share')} />
			</div>
		</div>
	);
};

export default RecipientHeader;
