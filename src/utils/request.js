import axios from 'axios';

const request = axios.create({
	baseURL: import.meta.env.VITE_BASE_API,
	timeout: 5000,
});

request.interceptors.response.use(
	(response) => {
		const { success, message, data } = response.data;

		if (success) {
			return data;
		}

		// 业务错误处理
		return Promise.reject(new Error(message));
	},
	(err) => {
		return Promise.reject(err);
	},
);

export { request };
