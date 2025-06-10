import DOMPurify from 'dompurify';

export const sanitizeToText = htmlString => {
	return DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] });
};
