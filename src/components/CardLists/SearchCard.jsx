import { useState, useEffect, useRef } from 'react';
import styles from './SearchCard.module.css';

function SearchCard({ recipients, onSearch }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const searchSectionRef = useRef(null);

	useEffect(() => {
		const handler = setTimeout(() => {
			const lowerCaseSearchTerm = searchTerm.toLowerCase();

			const newSuggestions = recipients
				.filter(recipient => recipient.name.toLowerCase().includes(lowerCaseSearchTerm))
				.map(recipient => recipient.name);
			setSuggestions([...new Set(newSuggestions)].slice(0, 5));

			const filteredRecipients = recipients.filter(recipient =>
				recipient.name.toLowerCase().includes(lowerCaseSearchTerm)
			);

			onSearch(filteredRecipients, searchTerm);

			if (searchTerm.trim() === '') {
				setShowSuggestions(false);
			} else {
				setShowSuggestions(true);
			}
		}, 300);
		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm, recipients, onSearch]);

	useEffect(() => {
		const handleClickOutside = event => {
			if (searchSectionRef.current && !searchSectionRef.current.contains(event.target)) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSuggestionClick = suggestion => {
		setSearchTerm(suggestion);
		setShowSuggestions(false);
	};

	const handleSearchInputChange = e => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className={styles.searchSection} ref={searchSectionRef}>
			<input
				type="text"
				placeholder="이름으로 검색..."
				value={searchTerm}
				onChange={handleSearchInputChange}
				onFocus={() =>
					searchTerm.trim() !== '' &&
					setSuggestions(
						[
							...new Set(
								recipients
									.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
									.map(r => r.name)
							),
						].slice(0, 5)
					) &&
					setShowSuggestions(true)
				}
				className={styles.searchInput}
			/>
			{showSuggestions && suggestions.length > 0 && searchTerm.trim() !== '' && (
				<ul className={styles.suggestionsList}>
					{suggestions.map((suggestion, index) => (
						<li key={index} onClick={() => handleSuggestionClick(suggestion)}>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default SearchCard;
