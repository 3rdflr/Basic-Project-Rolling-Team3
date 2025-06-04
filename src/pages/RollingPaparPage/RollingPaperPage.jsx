import React from 'react';
import useGetData from '../../hooks/useGetData';
import Header from '../../components/headers/Header/Header';
import RecipientHeader from '../../components/headers/Header/RecipientHeader';
import styles from './RollingPaparPage.module.css';

const RollingPaperPage = () => {
	return (
		<div>
			<header>
				<Header />
				<RecipientHeader />
			</header>
		</div>
	);
};

export default RollingPaperPage;
