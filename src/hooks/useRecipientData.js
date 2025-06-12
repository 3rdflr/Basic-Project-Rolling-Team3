import React, { useState, useEffect, useCallback } from 'react';
import { recipientsAPI } from '../api';

function useRecipientData(recipientId) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		if (!recipientId) return;

		try {
			setIsLoading(true);
			const result = await recipientsAPI.getRecipientsId(recipientId);
			setData(result);
			setError(null);
		} catch (e) {
			setError(e);
		} finally {
			setIsLoading(false);
		}
	}, [recipientId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const refetch = useCallback(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, error, refetch };
}

export default useRecipientData;
