export const sortRecent = data => {
	const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return sortedData;
};

export const sortHot = data => {
	const sortedData = data.sort((a, b) => b.messageCount - a.messageCount);
	return sortedData;
};
