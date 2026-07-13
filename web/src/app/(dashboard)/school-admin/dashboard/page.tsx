"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Role } from "@/types/roles";

export default function SchoolAdminDashboardPage() {
	const [role, setRole] = useState<Role>("school_admin");

	return (
		<DashboardShell
			role={role}
			schoolName="Greenfield Academy"
			activeTerm="2024/2025 — First Term"
			onDemoRoleChange={setRole}
		>
			<PageHeader
				title="Dashboard"
				description="Welcome back — here's what's happening at your school."
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard label="Total Students" value="482" accent="primary" hint="+12 this term" />
				<StatCard label="Attendance Today" value="94%" accent="success" />
				<StatCard label="Fee Defaulters" value="23" accent="warning" hint="₦1.2M outstanding" />
				<StatCard label="Staff Members" value="34" accent="info" />
			</div>
		</DashboardShell>
	);
}