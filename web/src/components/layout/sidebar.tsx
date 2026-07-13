"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_CONFIG } from "@/lib/nav-config";
import { Role } from "@/types/roles";
import { COMPANY } from "@/config/company";

interface SidebarProps {
	role: Role;
	isOpen: boolean;
	onClose: () => void;
	schoolName?: string;
	activeTerm?: string;
}

function SidebarContent({ role, schoolName, activeTerm, onNavigate }: {
	role: Role;
	schoolName?: string;
	activeTerm?: string;
	onNavigate?: () => void;
}) {
	const pathname = usePathname();
	const navItems = NAV_CONFIG[role];
	const isSchoolScoped = role !== "super_admin";
	const brandHref = role === "super_admin" ? "/schools" : "/school-admin/dashboard";

	return (
		<div className="flex h-full flex-col bg-sidebar/95 backdrop-blur-md text-sidebar-foreground">
			<Link
				href={brandHref}
				className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5"
			>
				<Logo size={32} />
				<div className="leading-tight">
					<div className="font-semibold text-sidebar-foreground">{COMPANY.name}</div>
					<div className="max-w-[160px] truncate text-[11px] text-muted-foreground">
						{isSchoolScoped ? (schoolName ?? "School Portal") : "Super Admin"}
					</div>
				</div>
			</Link>

			{isSchoolScoped && schoolName && (
				<div className="mx-3 mt-3 rounded-md bg-sidebar-accent/60 px-3 py-2">
					<div className="text-xs text-muted-foreground">School</div>
					<div className="text-sm font-medium text-sidebar-foreground">{schoolName}</div>
					{activeTerm && (
						<div className="text-[11px] text-muted-foreground">{activeTerm}</div>
					)}
				</div>
			)}

			<nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
				{navItems.map((item) => {
					const active =
						pathname === item.to ||
						(!item.to.endsWith("/dashboard") && pathname.startsWith(item.to));
					const Icon = item.icon;

					return (
						<Link
							key={item.to}
							href={item.to}
							onClick={onNavigate}
							className={cn(
								"flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
								active
									? "bg-sidebar-primary text-sidebar-primary-foreground"
									: "text-sidebar-foreground hover:bg-sidebar-accent/60"
							)}
						>
							<Icon className="size-4" />
							{item.label}
						</Link>
					);
				})}
			</nav>

			<Separator className="bg-sidebar-border" />

			<div className="p-3">
				<Link
					href="/"
					className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent/60"
				>
					<LogOut className="size-4" />
					Back to landing
				</Link>
			</div>
		</div>
	);
}

export function Sidebar({ role, isOpen, onClose, schoolName, activeTerm }: SidebarProps) {
	return (
		<>
			<aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
				<SidebarContent role={role} schoolName={schoolName} activeTerm={activeTerm} />
			</aside>

			<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
				<SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar/95 p-0 backdrop-blur-md lg:hidden">
					<SidebarContent
						role={role}
						schoolName={schoolName}
						activeTerm={activeTerm}
						onNavigate={onClose}
					/>
				</SheetContent>
			</Sheet>
		</>
	);
}