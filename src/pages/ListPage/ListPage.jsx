import { Helmet } from 'react-helmet';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { sortHot, sortRecent } from '../../utils/sort';

import useFetch from '../../hooks/useFetch.js';
import { recipientsAPI } from '../../api/index.js';
import Header from '../../components/headers/Header/Header';
import SearchCard from '../../components/CardLists/SearchCard.jsx';
import CardLists from '../../components/CardLists/CardLists';
import Keyframes from '../../components/animation/logoAnimation.jsx';
import styles from './ListPage.module.css';
import LinkButton from '../../components/buttons/Button/LinkButton.jsx';

const SLICE_NUM = 10;

function ListPage() {
	const [recipients, setRecipients] = useState([]);
	const [isLoading, error, fetchAllRecipients] = useFetch(recipientsAPI.getAllRecipient);

	const [currentSearchResults, setCurrentSearchResults] = useState([]);
	const [currentSearchTerm, setCurrentSearchTerm] = useState('');

	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		fetchAllRecipients({ limit: 1000, offset: 0 })
			.then(data => {
				if (data) {
					setRecipients(data);
				}
			})
			.catch(err => {
				console.error('롤링 페이퍼 목록 로드 실패:', err);
			});
	}, [fetchAllRecipients]);

	const handleSearchResultsChange = useCallback((results, searchTerm) => {
		setCurrentSearchResults(results);
		setCurrentSearchTerm(searchTerm);

		setIsSearching(searchTerm.trim() !== '');
	}, []);

	const hottest = useMemo(() => {
		if (!Array.isArray(recipients)) {
			return [];
		}
		return sortHot([...recipients]).slice(0, SLICE_NUM);
	}, [recipients]);

	const resent = useMemo(() => {
		if (!Array.isArray(recipients)) {
			return [];
		}
		return sortRecent([...recipients]).slice(0, SLICE_NUM);
	}, [recipients]);

	console.log('원본 카드 데이터:', recipients);
	console.log('인기순 카드 데이터:', hottest);
	console.log('최신순 카드 데이터:', resent);

	if (isLoading) {
		return (
			<>
				<Helmet>
					<title>Rolling | List</title>
				</Helmet>
				<div className={styles.container}>
					<Keyframes />
				</div>
			</>
		);
	}

	if (error) {
		return <div>오류 발생: {error.message}</div>;
	}

	return (
		<>
			<Helmet>
				<title>Rolling | List</title>
			</Helmet>
			<Header />
			<div className={styles.container}>
				<SearchCard recipients={recipients} onSearch={handleSearchResultsChange} />
				{isSearching ? (
					currentSearchResults.length > 0 ? (
						<>
							<p className={styles.text}>"{currentSearchTerm}" 검색 결과 🔍</p>
							<CardLists cards={currentSearchResults} />
						</>
					) : (
						<p className={styles.text}>"{currentSearchTerm}"에 대한 검색 결과가 없습니다.</p>
					)
				) : (
					<>
						<p className={styles.text}>인기 롤링 페이퍼 Top. 10 🔥</p>
						<CardLists cards={hottest} />
						<p className={styles.text}>최근에 만든 롤링 페이퍼 10 ⭐️</p>
						<CardLists cards={resent} />
					</>
				)}

				<LinkButton variant={'primary'} linkTo={'/post'} children={'나도 만들어보기'} />
			</div>
		</>
	);
}

export default ListPage;
