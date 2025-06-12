import { useState, useEffect, useRef, useCallback } from 'react';
import useClickOutside from '../../hooks/useClickOutside.js';
import styles from './SearchCard.module.css';

function SearchCard({ recipients, onSearch }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	const searchSectionRef = useRef(null);
	const inputRef = useRef(null);

	useClickOutside(searchSectionRef, () => {
		setShowSuggestions(false);
		setHighlightedIndex(-1);
	});

	useEffect(() => {
		const handler = setTimeout(() => {
			const keyword = searchTerm.toLowerCase();
			const filtered = recipients.filter(r => r.name.toLowerCase().includes(keyword));

			setSuggestions([...new Set(filtered.map(r => r.name))].slice(0, 5));
			setHighlightedIndex(-1);
			onSearch(filtered, searchTerm);
			setShowSuggestions(searchTerm.trim() !== '');
		}, 300);

		return () => clearTimeout(handler);
	}, [searchTerm, recipients, onSearch]);

	const handleSuggestionClick = suggestion => {
		setSearchTerm(suggestion);
		setShowSuggestions(false);
		setHighlightedIndex(-1);
	};

	const handleSearchInputChange = e => {
		setSearchTerm(e.target.value);
		setHighlightedIndex(-1);
	};

	const handleKeyDown = useCallback(
		e => {
			if (suggestions.length === 0) return;

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setHighlightedIndex(prevIndex => (prevIndex + 1) % suggestions.length);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setHighlightedIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
			} else if (e.key === 'Enter') {
				if (highlightedIndex !== -1) {
					e.preventDefault();
					handleSuggestionClick(suggestions[highlightedIndex]);
				} else {
					setShowSuggestions(false);
					setHighlightedIndex(-1);
				}
			} else if (e.key === 'Escape') {
				setShowSuggestions(false);
				setHighlightedIndex(-1);
				inputRef.current.blur();
			}
		},
		[suggestions, highlightedIndex, searchTerm, handleSuggestionClick]
	);

	const handleInputFocus = () => {
		if (searchTerm.trim() !== '') {
			const filtered = recipients
				.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
				.map(r => r.name);

			setSuggestions([...new Set(filtered)].slice(0, 5));
			setShowSuggestions(true);
		}
	};

	return (
		<div className={styles.searchSection} ref={searchSectionRef}>
			<input
				type="text"
				placeholder="이름으로 검색..."
				value={searchTerm}
				onChange={handleSearchInputChange}
				onKeyDown={handleKeyDown}
				onFocus={handleInputFocus}
				className={styles.searchInput}
			/>
			{showSuggestions && suggestions.length > 0 && searchTerm.trim() !== '' && (
				<ul className={styles.suggestionsList}>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className={index === highlightedIndex ? styles.highlighted : ''}
						>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default SearchCard;
