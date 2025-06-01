import React, { useEffect, useRef, useState } from 'react';
import { IoShareOutline } from 'react-icons/io5';
import styles from './ShareButton.module.css';

const ShareButton = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setOpen(prev => !prev);

	useEffect(() => {
		const handleClickOutside = e => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.sharebutton} onClick={toggleDropdown}>
				<IoShareOutline />
			</div>
			{open && (
				<ul className={styles.dropdawn}>
					<li>카카오톡 공유</li>
					<li>URL 공유</li>
				</ul>
			)}
		</div>
	);
};

export default ShareButton;
