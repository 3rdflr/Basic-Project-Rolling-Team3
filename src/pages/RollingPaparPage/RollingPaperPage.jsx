import Header from '../../components/headers/Header/Header';
import RecipientHeader from '../../components/headers/Header/RecipientHeader';
import MessageCardList from '../../components/MessageCard/MessageCardList';
import { useParams } from 'react-router';
import useRecipientData from '../../hooks/useRecipientData';
import useRecipientReactions from '../../hooks/useRecipientReactions';
import useRecipientMessages from '../../hooks/useRecipientsMessages';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button/Button';

import styles from './RollingPaparPage.module.css';
import { useState } from 'react';
import useDeleteRecipient from '../../hooks/useDeleteRecipient';

const RollingPaperPage = () => {
	const { id: recipientId } = useParams();
	const [isEditMode, setIsEditMode] = useState(false);
	const navigate = useNavigate();

	const toggleEditMode = () => {
		setIsEditMode(prev => !prev);
	};

	const { deleteRecipient } = useDeleteRecipient();

	const {
		data: recipientData,
		isLoading: loadingRecipient,
		error: errorRecipient,
	} = useRecipientData(recipientId);

	const {
		data: reactionData,
		isLoading: loadingReactions,
		error: errorReactions,
		refetch: refetchReactions,
	} = useRecipientReactions(recipientId);

	const {
		data: messagesCardData,
		isLoading: isLoadingMessagesCard,
		error: errorMessagesCard,
	} = useRecipientMessages(recipientId);

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

	if (loadingRecipient || loadingReactions) return <div>로딩 중...</div>;
	if (errorRecipient || errorReactions) return <div>에러 발생!</div>;

	const { topReactions, name, backgroundColor, backgroundImageURL } = recipientData;
	const allReactions = reactionData || [];

	return (
		<div>
			<header>
				<Header />
				<RecipientHeader
					topReactions={topReactions}
					name={name}
					recipientId={recipientId}
					allReactions={allReactions}
					onReactionAdded={refetchReactions}
				/>
			</header>
			<main
				style={{
					backgroundColor: backgroundImageURL ? undefined : backgroundColor,
					backgroundImage: backgroundImageURL ? `url(${backgroundImageURL})` : undefined,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					minHeight: '100vh',
					overflow: 'auto',
					position: 'relative',
					padding: '0 20px',
				}}
				className={styles.main}
			>
				<div className={styles.buttonItems}>
					<Link to="/list">
						<Button size="small">뒤로 가기</Button>
					</Link>
					<Button size="small" onClick={toggleEditMode}>
						{isEditMode ? '편집완료' : '편집하기'}
					</Button>
				</div>
				{isEditMode && (
					<Button size="small" onClick={handleDelete} className={styles.deleteButton}>
						롤링페이퍼 삭제하기
					</Button>
				)}
				<MessageCardList messages={messagesCardData} id={recipientId} isEditMode={isEditMode} />
			</main>
		</div>
	);
};

export default RollingPaperPage;
