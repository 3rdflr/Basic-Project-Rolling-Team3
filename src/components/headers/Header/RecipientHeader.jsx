import React from 'react';
import ShareButton from '../../buttons/ShareButton/ShareButton';
import BadgeList from '../../BadgeList/BadgeList';

import styles from './RecipientHeader.module.css';

const RecipientHeader = ({ name, topReactions, allReactions }) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.recipient}>To. {name}</h1>
			<div className={styles.headerItems}>
				<BadgeList topReactions={topReactions} allReactions={allReactions} />
				<ShareButton />
			</div>
		</div>
	);
};

export default RecipientHeader;
