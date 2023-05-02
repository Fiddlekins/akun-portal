export default function setTimeoutPromise(duration) {
	return new Promise((res) => {
		setTimeout(res, duration);
	})
};
