import axios from 'axios';
import {
	BASE_URL,
	getBackgroundImg,
	getProfileImg,
	getMessage,
	getRecipients,
	getRecipientsId,
	getRecipientsMessage,
	getRecipientReactions,
} from '../constants/endPoints.js';

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response) {
			console.error(`API 요청 실패: ${error.response.status}`, error.response.data);
		} else if (error.request) {
			console.error('API 요청 응답 없음:', error.request);
		} else {
			console.error('API 요청 설정 오류:', error.message);
		}
	}
);

const recipientsAPI = {
	// 모든 롤링 페이퍼 목록 가져오기
	getAllRecipient: async params => {
		const response = await api.get(getRecipients(), { params });
		return response.data.results;
	},
	// 특정 롤링 페이퍼 가져오기
	getRecipientsId: async id => {
		const response = await api.get(getRecipientsId(id));
		return response.data;
	},
	// 새 롤링 페이퍼 생성
	createRecipients: async data => {
		const response = await api.post(getRecipients(), data);
		return response.data;
	},
	// 특정 롤링 페이퍼 삭제
	deleteRecipients: async id => {
		const response = await api.delete(getRecipientsId(id));
		return response.data;
	},
	// 특정 롤링 페이퍼의 메시지 가져오기
	getRecipientsMessages: async (id, params) => {
		const response = await api.get(getRecipientsMessage(id), { params });
		return response.data.results;
	},
	// 특정 롤링 페이퍼에 메시지 생성
	createRecipientsMessage: async (recipientId, data) => {
		const response = await api.post(getRecipientsMessage(recipientId), data);
		return response.data;
	},
	deleteRecipientsMessage: async id => {
		const response = await api.delete(getMessage(id));
		return response.data;
	},
	// 특정 롤링 페이퍼의 이모티콘 가져오기
	getRecipientsReactions: async id => {
		const response = await api.get(getRecipientReactions(id));
		return response.data.results;
	},
	// 특정 롤링 페이퍼에 리액션 추가 (POST)
	createRecipientsReaction: async (recipientId, data) => {
		const response = await api.post(getRecipientReactions(recipientId), data);
		return response.data;
	},
};

const imagesAPI = {
	// 배경 이미지 가져오기
	getBackgrounds: async () => {
		const response = await api.get(getBackgroundImg());
		return response.data.imageUrls;
	},
	// 프로필 이미지 가져오기
	getProfiles: async () => {
		const response = await api.get(getProfileImg());
		return response.data.imageUrls;
	},
};

export { recipientsAPI, imagesAPI };
