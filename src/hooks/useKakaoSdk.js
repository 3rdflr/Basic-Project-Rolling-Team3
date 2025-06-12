import { useEffect } from 'react';
import { KAKAO_APP_KEY } from '../constants/endPoints';

function useKakaoSdk() {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
		script.async = true;
		script.onload = () => {
			window.Kakao && window.Kakao.init(KAKAO_APP_KEY);
		};
		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, []);
}

export default useKakaoSdk;
