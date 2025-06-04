import React from 'react';
import ShareButton from '../../buttons/ShareButton/ShareButton';
import BadgeList from '../../BadgeList/BadgeList';

import styles from './RecipientHeader.module.css';

const RecipientHeader = () => {
	return (
		<div className={styles.header}>
			<BadgeList />
			<ShareButton />
		</div>
	);
};

export default RecipientHeader;
