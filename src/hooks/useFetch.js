import { useEffect, useState } from 'react';

function useFetch(fetchFunction) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await fetchFunction();
				setData(result);
			} catch (err) {
				setError(err);
				console.error('useFetch Error:', err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [fetchFunction]);

	return { data, isLoading, error };
}

export default useFetch;
