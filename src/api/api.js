import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../constants/endPoints.js';

async function api(type, method, id, data = null, params = {}) {
	const endpoint = ENDPOINTS[type][method];

	const urlPath = typeof endpoint === 'function' ? endpoint(id) : endpoint;

	const instance = axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		let response;

		switch (method.toUpperCase()) {
			case 'GET':
				response = await instance.get(urlPath, { params: params });
				break;
			case 'POST':
				response = await instance.post(urlPath, data);
				break;
			case 'DELETE':
				response = await instance.delete(urlPath);
				break;
			default:
				throw new Error('GET, POST, DELETE 중 하나를 입력해주세요');
		}
		return response.data;
	} catch (error) {
		if (error.response) {
			console.log(`API 요청 실패: ${error.response.status}`);
		}
	}
}

export default api;
