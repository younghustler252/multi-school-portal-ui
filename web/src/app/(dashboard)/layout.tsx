"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { AuthProvider } from "@/components/layout/auth-provider";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardGuard({ children }: { children: ReactNode }) {
	const router = useRouter();
	const user = useAuthStore((s) => s.user);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace("/login");
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated || !user) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background p-8">
				<Skeleton className="h-10 w-48" />
			</div>
		);
	}

	return (
		<DashboardShell role={user.role}>
			{children}
		</DashboardShell>
	);
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<DashboardGuard>{children}</DashboardGuard>
		</AuthProvider>
	);
}