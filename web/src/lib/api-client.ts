import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { ApiErrorResponse, ApiResponse } from "@/types/api-response";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // sends httpOnly refresh cookie automatically
});

axiosInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor does ONE job: silent token refresh on 401.
// No unwrapping, no error reshaping — axios stays standard axios.
let isRefreshing = false;

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as InternalAxiosRequestConfig | undefined;

		if (error.response?.status === 401 && !isRefreshing && originalRequest) {
			isRefreshing = true;
			try {
				const refreshed = await useAuthStore.getState().refreshAccessToken();
				isRefreshing = false;
				if (refreshed) {
					return axiosInstance(originalRequest);
				}
			} catch {
				isRefreshing = false;
			}
			useAuthStore.getState().logout();
		}

		return Promise.reject(error); // stays a real AxiosError
	}
);

// ==================================
// TYPED REQUEST WRAPPER
// ==================================
// Explicit unwrap + error normalization, in ONE place, with real generics —
// no cast on axiosInstance itself, no hidden interceptor behavior.

async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
	try {
		const response = await axiosInstance.request<ApiResponse<T>>(config);
		return response.data;
	} catch (err) {
		const axiosErr = err as AxiosError<ApiErrorResponse>;

		if (axiosErr.response?.data) {
			return axiosErr.response.data; // backend's real error envelope
		}

		return {
			success: false,
			message: axiosErr.message || "Network error",
		};
	}
}

export const API = {

	get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
		request<T>({ ...config, method: "GET", url }),

	post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
		request<T>({ ...config, method: "POST", url, data }),

	put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
		request<T>({ ...config, method: "PUT", url, data }),

	patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
		request<T>({ ...config, method: "PATCH", url, data }),

	delete: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
		request<T>({ ...config, method: "DELETE", url }),

	// bypasses ApiResponse<T> envelope entirely — for report-card PDF downloads
	downloadFile: async (url: string, config?: AxiosRequestConfig): Promise<Blob> => {
		const response = await axiosInstance.request<Blob>({ ...config, method: "GET", url, responseType: "blob" });
		return response.data;
	},

};