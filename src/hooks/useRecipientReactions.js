import React, { useState, useEffect, useCallback } from 'react';
import { recipientsAPI } from '../api';

function useRecipientReactions(recipientId) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchReactions = useCallback(async () => {
		if (!recipientId) return;

		try {
			setIsLoading(true);
			const result = await recipientsAPI.getRecipientsReactions(recipientId);
			setData(result);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	}, [recipientId]);

	useEffect(() => {
		fetchReactions();
	}, [fetchReactions]);

	return { data, isLoading, error, refetch: fetchReactions };
}

export default useRecipientReactions;
