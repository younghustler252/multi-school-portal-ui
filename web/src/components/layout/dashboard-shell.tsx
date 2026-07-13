"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Role } from "@/types/roles";

interface DashboardShellProps {
	role: Role;
	children: ReactNode;
	schoolName?: string;
	activeTerm?: string;
	// Dev-only — wire to a real handler once auth/role comes from session, not props
	onDemoRoleChange?: (role: Role) => void;
}

export function DashboardShell({
	role,
	children,
	schoolName,
	activeTerm,
	onDemoRoleChange,
}: DashboardShellProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex min-h-screen bg-background text-foreground">
			<Sidebar
				role={role}
				isOpen={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
				schoolName={schoolName}
				activeTerm={activeTerm}
			/>

			<div className="flex min-w-0 flex-1 flex-col">
				<Topbar
					role={role}
					onMenuClick={() => setSidebarOpen(true)}
					onDemoRoleChange={onDemoRoleChange}
				/>

				<main className="mx-auto w-full max-w-[1400px] flex-1 p-4 md:p-8">
					{children}
				</main>
			</div>
		</div>
	);
}