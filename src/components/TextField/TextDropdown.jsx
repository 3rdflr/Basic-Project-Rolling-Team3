import { useRef, useState, useEffect } from 'react';
import styles from './TextDropdown.module.css';
import arrowUp from '../../assets/icons/arrow_top.svg';
import arrowDown from '../../assets/icons/arrow_down.svg';

function TextDropdown({ value, options, onChange, error }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const handleSelect = option => {
		onChange(option);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.wrapper} ref={dropdownRef}>
			<div className={styles.container} onClick={() => setIsOpen(!isOpen)}>
				<p className={styles.value}>{value}</p>
				<span className={styles.arrow}>
					{isOpen ? (
						<img className={styles.image} src={arrowUp} />
					) : (
						<img className={styles.image} src={arrowDown} />
					)}
				</span>
			</div>
			{isOpen && (
				<ul className={styles.dropdownList}>
					{options.map((option, index) => (
						<li key={index} onClick={() => handleSelect(option)}>
							<p className={styles.dropdownOption}>{option}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default TextDropdown;
