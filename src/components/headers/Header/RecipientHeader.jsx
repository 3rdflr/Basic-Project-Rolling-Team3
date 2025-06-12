import React, { useRef, useState, useCallback } from 'react';
import ProfileImg from '../../Badge/ProfileImg';
import ShareButton from '../../buttons/ShareButton/ShareButton';
import BadgeList from '../../BadgeList/BadgeList';
import AddEmojiButton from '../../buttons/AddEmojiButton/AddEmojiButton';
import useClickOutside from '../../../hooks/useClickOutside';

import styles from './RecipientHeader.module.css';
import { useScreenSize } from '../../../hooks/useScreenSize';

const RecipientHeader = ({
	name,
	topReactions,
	allReactions,
	recipientId,
	onReactionAdded,
	messageCount,
	recentMessages,
	loadingReactions,
}) => {
	const [openToggle, setOpenToggle] = useState(false);
	const dropdownRef = useRef(false);
	const screenSize = useScreenSize();

	useClickOutside(dropdownRef, () => setOpenToggle(false));

	const handleToggle = useCallback(name => {
		setOpenToggle(prev => (prev === name ? false : name));
	}, []);

	return (
		<div className={styles.header}>
			<h1 className={styles.recipient}>To. {name}</h1>
			<div className={styles.headerItems} ref={dropdownRef}>
				{screenSize !== 'sm' && (
					<div className={styles.authorStatus}>
						<ProfileImg count={messageCount} data={recentMessages} />
						<span>
							<span className={styles.authorStatusCount}>{messageCount}</span>명이 작성했어요!
						</span>
					</div>
				)}

				<BadgeList
					topReactions={topReactions}
					allReactions={allReactions}
					isOpen={openToggle === 'badge'}
					toggleOpen={() => handleToggle('badge')}
					isLoading={loadingReactions}
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
