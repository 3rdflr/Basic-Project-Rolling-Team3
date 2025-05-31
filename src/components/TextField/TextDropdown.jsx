import { useState } from 'react';
import styles from './TextField.module.css';
import arrowUp from '../../assets/icons/arrow_top.svg';
import arrowDown from '../../assets/icons/arrow_down.svg';

function TextDropdown({ value, options, onChange, error }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = option => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			{/*클래스네임 다시 구분 필요함.*/}
			<div className={styles.container} onClick={() => setIsOpen(!isOpen)}>
				{value}
				<span className={styles.arrow}>
					{isOpen ? <img src={arrowUp} /> : <img src={arrowDown} />}
				</span>
			</div>
			{isOpen && (
				<ul className={styles.dropdownList}>
					{options.map((option, index) => (
						<li key={index} onClick={() => handleSelect(option)}>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default TextDropdown;
