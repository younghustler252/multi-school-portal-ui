export interface ApiSuccessResponse<T> {
	success: true;
	message: string;
	data: T;
	meta?: PaginationMeta;
}

export interface ApiErrorResponse {
	success: false;
	message: string;
	errors?: Record<string, string>; // field name → single error message, not string[]
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
}