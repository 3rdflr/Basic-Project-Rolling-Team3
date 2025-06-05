import { Helmet } from 'react-helmet';
import { useState, useMemo, useEffect } from 'react';
import { sortHot, sortRecent } from '../../utils/sort';

import useFetch from '../../hooks/useFetch.js';
import { recipientsAPI } from '../../api/index.js';
import Header from '../../components/headers/Header/Header';
import CardLists from '../../components/CardLists/CardLists';
import Button from '../../components/buttons/Button/Button';

import styles from './ListPage.module.css';

function ListPage() {
	const [recipients, setRecipients] = useState([]);
	const [isLoading, error, fetchAllRecipients] = useFetch(recipientsAPI.getAllRecipient);

	useEffect(() => {
		fetchAllRecipients({ limit: 100, offset: 0 })
			.then(data => {
				if (data) {
					setRecipients(data);
				}
			})
			.catch(err => {
				console.error('롤링 페이퍼 목록 로드 실패:', err);
			});
	}, [fetchAllRecipients]);

	const hottest = useMemo(() => {
		if (!Array.isArray(recipients)) {
			return [];
		}
		return sortHot([...recipients]);
	}, [recipients]);

	const resent = useMemo(() => {
		if (!Array.isArray(recipients)) {
			return [];
		}
		return sortRecent([...recipients]);
	}, [recipients]);

	console.log('원본 카드 데이터:', recipients);
	console.log('인기순 카드 데이터:', hottest);
	console.log('최신순 카드 데이터:', resent);

	if (isLoading) {
		return <div>카드 목록을 불러오는 중입니다...</div>;
	}

	if (error) {
		return <div>오류 발생: {error.message}</div>;
	}

	if (!Array.isArray(recipients) || recipients.length === 0) {
		return <div>표시할 카드 데이터가 없습니다.</div>;
	}

	return (
		<>
			<Helmet>
				<title>Rolling | List</title>
			</Helmet>
			<Header />
			<div className={styles.container}>
				<p className={styles.text}>인기 롤링 페이퍼 Top. 10 🔥</p>
				<CardLists cards={hottest} />
				<p className={styles.text}>최근에 만든 롤링 페이퍼 10 ⭐️</p>
				<CardLists cards={resent} />
				<Button classStyle={'primary'} linkTo={'/post'} children={'나도 만들어보기'} />
			</div>
		</>
	);
}

export default ListPage;
