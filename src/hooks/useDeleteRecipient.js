import React, { useState, useEffect } from 'react';
import { recipientsAPI } from '../api';

function useDeleteRecipient() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const deleteRecipient = async messageId => {
		setIsLoading(true);
		setError(null);

		try {
			await recipientsAPI.deleteRecipients(messageId);
		} catch (e) {
			setError(e);
			console.error('메시지 삭제 중 오류 발생:', e);
		} finally {
			setIsLoading(false);
		}
	};

	return { deleteRecipient, isLoading, error };
}

export default useDeleteRecipient;
