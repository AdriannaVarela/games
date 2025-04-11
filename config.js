const PAGE_URL =
	process.env.NODE_ENV === "production"
		? "placeholder"
		: "http://localhost:3000";

module.exports = {PAGE_URL};

const MONGO_URI =
	process.env.NODE_ENV === "production"
		? process.env.MONGO_URI_PRODU
		: process.env.MONGO_URI_TEST;

module.exports = {PAGE_URL, MONGO_URI};
