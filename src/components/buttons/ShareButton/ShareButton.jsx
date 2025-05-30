import React, { useEffect, useState } from 'react';
import { IoShareOutline } from 'react-icons/io5';
import './ShareButton.css';

const ShareButton = () => {
	const [open, setOpen] = useState(false);

	const toggleDropdown = () => setOpen(prev => !prev);

	return (
		<div className="sharebutton-wrapper">
			<div className="sharebutton" onClick={toggleDropdown}>
				<IoShareOutline />
			</div>
			{open && (
				<ul className="dropdown">
					<li>카카오톡 공유</li>
					<li>URL 공유</li>
				</ul>
			)}
		</div>
	);
};

export default ShareButton;
