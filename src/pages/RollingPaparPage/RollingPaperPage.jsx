import Header from '../../components/headers/Header/Header';
import RecipientHeader from '../../components/headers/Header/RecipientHeader';
import MessageCardList from '../../components/MessageCard/MessageCardList';
import { useParams } from 'react-router';
import useRecipientData from '../../hooks/useRecipientData';
import useRecipientReactions from '../../hooks/useRecipientReactions';
import useRecipientMessages from '../../hooks/useRecipientsMessages';

import styles from './RollingPaparPage.module.css';

const RollingPaperPage = () => {
	const { id: recipientId } = useParams();

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

	if (loadingRecipient || loadingReactions) return <div>로딩 중...</div>;
	if (errorRecipient || errorReactions) return <div>에러 발생!</div>;

	const { topReactions, name } = recipientData;
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
			<main>
				<MessageCardList messages={messagesCardData} id={recipientId} />
			</main>
		</div>
	);
};

export default RollingPaperPage;
