
export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
    meta?: PaginationMeta;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>; // field-level validation errors (Zod)
    code?: string; // e.g. "STUDENT_LIMIT_REACHED", "INVALID_CREDENTIALS"
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedRequest {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}