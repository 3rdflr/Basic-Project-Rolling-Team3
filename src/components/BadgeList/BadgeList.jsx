import React, { useState } from 'react';
import { EmojiBadge } from '../Badge/Badge';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './BadgeList.module.css';

const BadgeList = ({ topReactions, allReactions, isOpen, toggleOpen }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.topReactions}>
				{topReactions.map(emoji => (
					<EmojiBadge data={emoji} key={emoji.id} />
				))}
				<button onClick={toggleOpen}>
					<IoIosArrowDown className={styles.arrowDown} />
				</button>
			</div>
			{isOpen && (
				<div className={styles.badgeList}>
					{allReactions.map(({ id, emoji, count }) => (
						<span className={styles.badge} key={id}>
							<div className={styles.emoji}>{emoji}</div>
							<div className={styles.count}>{count}</div>
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default BadgeList;
