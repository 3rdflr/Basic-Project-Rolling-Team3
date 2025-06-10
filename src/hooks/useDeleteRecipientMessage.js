import { useState } from 'react';
import { recipientsAPI } from '../api';

function useDeleteRecipientMessage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const deleteMessage = async messageId => {
		setIsLoading(true);
		setError(null);

		try {
			await recipientsAPI.deleteRecipientsMessage(messageId);
		} catch (e) {
			setError(e);
			console.error('메시지 삭제 중 오류 발생:', e);
		} finally {
			setIsLoading(false);
		}
	};

	return { deleteMessage, isLoading, error };
}

export default useDeleteRecipientMessage;
