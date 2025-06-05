import { useCallback, useState } from 'react';

function useFetch(asyncFunction) {
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState(null);

	const wrappedFunction = useCallback(
		async (...args) => {
			setisLoading(true);
			setError(null);
			try {
				const result = await asyncFunction(...args);
				return result;
			} catch (error) {
				setError(error);
				throw error;
			} finally {
				setisLoading(false);
			}
		},
		[asyncFunction]
	);

	return [isLoading, error, wrappedFunction];
}

export default useFetch;
