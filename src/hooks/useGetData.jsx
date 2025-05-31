import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';

function useGetData(type, id, queryParams = {}) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await api(type, 'GET', id, null, queryParams);
				if (['RECIPIENTS_ID', 'BACKGROUND_IMGS', 'PROFILE_IMGS', 'MESSAGES'].includes(type)) {
					setData(result);
				} else {
					setData(result.results);
				}
			} catch (err) {
				setError(err);
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [type, id, JSON.stringify(queryParams)]);

	return { data, isLoading, error };
}

export default useGetData;
