export const BASE_URL = 'https://rolling-api.vercel.app';
export const TEAM = '16-3';
export const KAKAO_APP_KEY = '813022e1dab181dce46278fb6dc7708f';

export const getBackgroundImg = () => '/background-images/';

export const getProfileImg = () => '/profile-images/';

export const getMessage = id => `/${TEAM}/messages/${id}/`;

export const getRecipients = () => `/${TEAM}/recipients/`;

export const getRecipientsId = id => `/${TEAM}/recipients/${id}/`;

export const getRecipientsMessage = id => `/${TEAM}/recipients/${id}/messages/`;

export const getRecipientReactions = id => `/${TEAM}/recipients/${id}/reactions/`;
