import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/features/auth/services/auth.api";
import { UserResponseData, RegisterDto } from "@/features/auth/types/auth.types";

interface AuthState {
	user: UserResponseData | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	login: (email: string, password: string) => Promise<void>;
	register: (data: RegisterDto) => Promise<{ message: string }>;
	logout: () => void;
	fetchCurrentUser: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,

			login: async (email: string, password: string) => {
				set({ isLoading: true });
				const res = await authApi.login({ email, password });
				if (!res.success) {
					set({ isLoading: false });
					throw res;
				}
				// tokens are already set as httpOnly cookies by the backend — nothing to store
				set({ user: res.data.user, isAuthenticated: true, isLoading: false });
			},

			register: async (data: RegisterDto) => {
				set({ isLoading: true });
				const res = await authApi.register(data);
				set({ isLoading: false });
				if (!res.success) {
					throw res;
				}
				return res.data; // { message } — no session created
			},

			logout: () => {
				authApi.logout().catch(() => {});
				set({ user: null, isAuthenticated: false });
			},

			// Called on app load — cookies may still be valid from a previous visit.
			// Hits /auth/me; if it succeeds, cookie was valid (401 triggers the
			// interceptor's silent refresh automatically before failing for good).
			fetchCurrentUser: async () => {
				try {
					const res = await authApi.getCurrentUser();
					if (res.success) {
						set({ user: res.data, isAuthenticated: true });
						return true;
					}
				} catch {
					// no valid session
				}
				set({ user: null, isAuthenticated: false });
				return false;
			},
		}),
		{
			name: "school-portal-auth",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);