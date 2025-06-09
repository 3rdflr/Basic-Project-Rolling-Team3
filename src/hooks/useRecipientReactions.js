import React, { useState, useEffect } from 'react';
import { recipientsAPI } from '../api';

function useRecipientReactions(recipientId) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!recipientId) return;

		const fetchReactions = async () => {
			try {
				setIsLoading(true);
				const result = await recipientsAPI.getRecipientsReactions(recipientId);
				setData(result);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchReactions();
	}, [recipientId]);

	return { data, isLoading, error };
}

export default useRecipientReactions;
