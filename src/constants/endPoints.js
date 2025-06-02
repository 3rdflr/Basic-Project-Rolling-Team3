export const BASE_URL = 'https://rolling-api.vercel.app';
export const TEAM = '3';
export const KAKAO_APP_KEY = '813022e1dab181dce46278fb6dc7708f';

export const ENDPOINTS = {
	BACKGROUND_IMGS: {
		GET: '/background-images/',
	},
	PROFILE_IMGS: {
		GET: '/profile-images/',
	},
	MESSAGES: {
		DELETE: id => `/${TEAM}/messages/${id}/`,
	},
	RECIPIENTS: {
		GET: `/${TEAM}/recipients/`,
		POST: `/${TEAM}/recipients/`,
	},
	RECIPIENTS_ID: {
		GET: id => `/${TEAM}/recipients/${id}/`,
		DELETE: id => `/${TEAM}/recipients/${id}/`,
	},
	RECIPIENTS_MESSAGES: {
		GET: id => `/${TEAM}/recipients/${id}/messages/`,
		POST: id => `/${TEAM}/recipients/${id}/messages/`,
	},
	RECIPIENTS_REACTIONS: {
		GET: id => `/${TEAM}/recipients/${id}/reactions/`,
		POST: id => `/${TEAM}/recipients/${id}/reactions/`,
	},
};
