import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/features/auth/services/auth.api";
import { UserResponseData, RegisterDto } from "@/features/auth/types/auth.types";

interface AuthState {
	user: UserResponseData | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	login: (email: string, password: string) => Promise<void>;
	register: (data: RegisterDto) => Promise<void>;
	logout: () => void;
	refreshAccessToken: () => Promise<boolean>;
	setSession: (user: UserResponseData, accessToken: string) => void;
	fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			isAuthenticated: false,
			isLoading: false,

			login: async (email: string, password: string) => {
				set({ isLoading: true });
				const res = await authApi.login({ email, password });
				if (!res.success) {
					set({ isLoading: false });
					throw res;
				}
				const { user, accessToken } = res.data;
				set({ user, accessToken, isAuthenticated: true, isLoading: false });
			},

			register: async (data: RegisterDto) => {
				set({ isLoading: true });
				const res = await authApi.register(data);
				if (!res.success) {
					set({ isLoading: false });
					throw res;
				}
				const { user, accessToken } = res.data;
				set({ user, accessToken, isAuthenticated: true, isLoading: false });
			},

			logout: () => {
				authApi.logout().catch(() => {});
				set({ user: null, accessToken: null, isAuthenticated: false });
			},

			refreshAccessToken: async () => {
				const res = await authApi.refresh();
				if (!res.success) return false;
				set({ accessToken: res.data.accessToken });
				return true;
			},

			setSession: (user: UserResponseData, accessToken: string) => {
				set({ user, accessToken, isAuthenticated: true });
			},

			fetchCurrentUser: async () => {
				const res = await authApi.getCurrentUser();
				if (res.success) {
					set({ user: res.data, isAuthenticated: true });
				}
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