export const sortRecent = data => {
	const sortedData = data
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		.slice(0, 10);
	return sortedData;
};

export const sortHot = data => {
	const sortedData = data.sort((a, b) => b.messageCount - a.messageCount).slice(0, 10);
	return sortedData;
};
