import React, { useState, useEffect } from 'react';
import { recipientsAPI } from '../api';

function useRecipientData(recipientId) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!recipientId) return;

		const fetchData = async () => {
			try {
				setIsLoading(true);
				const result = await recipientsAPI.getRecipientsId(recipientId);
				setData(result);
			} catch (e) {
				setError(e);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [recipientId]);

	return { data, isLoading, error };
}

export default useRecipientData;
