import React, { useState, useEffect } from 'react';
import { recipientsAPI } from '../api';

function useRecipientMessages(recipientId) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const messages = await recipientsAPI.getRecipientsMessages(recipientId);
				setData(messages);
			} catch (error) {
				console.error('메시지 불러오기 실패:', error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMessages();
	}, [recipientId]);

	return { data, isLoading, error };
}

export default useRecipientMessages;
