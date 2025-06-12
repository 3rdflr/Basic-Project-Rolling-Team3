import Header from '../../components/headers/Header/Header';
import RecipientHeader from '../../components/headers/Header/RecipientHeader';
import MessageCardList from '../../components/MessageCard/MessageCardList';
import { useParams } from 'react-router';
import useRecipientData from '../../hooks/useRecipientData';
import useRecipientReactions from '../../hooks/useRecipientReactions';
import useRecipientMessages from '../../hooks/useRecipientsMessages';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button/Button';
import { Helmet } from 'react-helmet';

import styles from './RollingPaparPage.module.css';
import { useState, useCallback } from 'react';
import useDeleteRecipient from '../../hooks/useDeleteRecipient';
import { useScreenSize } from '../../hooks/useScreenSize';
import Keyframes from '../../components/animation/logoAnimation';
import LinkButton from '../../components/buttons/Button/LinkButton';

const RollingPaperPage = () => {
	const { id: recipientId } = useParams();
	const [isEditMode, setIsEditMode] = useState(false);
	const navigate = useNavigate();
	const screenSize = useScreenSize();

	const toggleEditMode = () => {
		setIsEditMode(prev => !prev);
	};

	const { deleteRecipient } = useDeleteRecipient();

	const {
		data: messagesCardData,
		isLoading: isLoadingMessagesCard,
		error: errorMessagesCard,
	} = useRecipientMessages(recipientId);

	const {
		data: recipientData,
		isLoading: loadingRecipient,
		error: errorRecipient,
		refetch: refetchRecipientData,
	} = useRecipientData(recipientId);

	const {
		data: reactionData,
		isLoading: loadingReactions,
		error: errorReactions,
		refetch: refetchReactions,
	} = useRecipientReactions(recipientId);

	const handleReactionAdded = useCallback(() => {
		refetchReactions();
		refetchRecipientData();
	}, [refetchReactions, refetchRecipientData]);

	const handleDelete = async () => {
		if (!recipientId) return;

		const confirm = window.confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.');

		if (!confirm) return;

		try {
			await deleteRecipient(recipientId);
			alert('삭제가 완료되었습니다.');
			navigate('/list');
		} catch (error) {
			console.error('삭제 중 오류 발생:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};
	if (isLoadingMessagesCard || !recipientData)
		return (
			<div className={styles.loading}>
				<Keyframes />
			</div>
		);
	if (errorRecipient || errorReactions) return <div>에러 발생!</div>;

	const { topReactions, name, backgroundColor, backgroundImageURL, messageCount, recentMessages } =
		recipientData;
	const allReactions = reactionData || [];

	const resolvedColor = backgroundImageURL ? undefined : `var(--${backgroundColor}-200)`;

	return (
		<div>
			<Helmet>
				<title>{name}의 RollingPaper</title>
				<link rel="icon" href="/LogoIcon.png" />
			</Helmet>
			{screenSize !== 'sm' && <Header isForm={true} />}
			<header className={styles.header}>
				<RecipientHeader
					messageCount={messageCount}
					recentMessages={recentMessages}
					topReactions={topReactions}
					name={name}
					recipientId={recipientId}
					allReactions={allReactions}
					onReactionAdded={handleReactionAdded}
				/>
			</header>
			<main
				style={{
					backgroundColor: resolvedColor,
					backgroundImage: backgroundImageURL ? `url(${backgroundImageURL})` : resolvedColor,
				}}
				className={styles.main}
			>
				<div className={styles.wrapper}>
					<div className={styles.buttonItems}>
						<LinkButton variant="small" linkTo="/list">
							뒤로 가기
						</LinkButton>
						<Button variant="small" onClick={toggleEditMode}>
							{isEditMode ? '편집완료' : '편집하기'}
						</Button>
					</div>
					{isEditMode && (
						<Button variant="small" onClick={handleDelete} className={styles.deleteButton}>
							롤링페이퍼 삭제하기
						</Button>
					)}
					<MessageCardList
						messages={messagesCardData}
						id={recipientId}
						isEditMode={isEditMode}
						isLoadingMessagesCard={isLoadingMessagesCard}
					/>
				</div>
			</main>
		</div>
	);
};

export default RollingPaperPage;
