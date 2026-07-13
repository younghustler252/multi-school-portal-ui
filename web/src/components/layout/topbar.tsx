"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Search, Bell, Sun, Moon, UserCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_META } from "@/lib/nav-config";
import { Role } from "@/types/roles";

interface TopbarProps {
	role: Role;
	onMenuClick: () => void;
	searchPlaceholder?: string;
	// Dev-only demo role switcher — remove once real auth/login is wired
	onDemoRoleChange?: (role: Role) => void;
	showDemoBadge?: boolean;
}

const DEMO_SWITCHABLE_ROLES: Role[] = [
	"school_admin",
	"teacher",
	"bursar",
	"principal",
	"student",
	"guardian",
];

export function Topbar({
	role,
	onMenuClick,
	searchPlaceholder = "Search students, staff, invoices…",
	onDemoRoleChange,
	showDemoBadge = true,
}: TopbarProps) {
	const { theme, setTheme } = useTheme();
	const meta = ROLE_META[role];
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);


	return (
		<header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
			<button
				className="lg:hidden"
				onClick={onMenuClick}
				aria-label="Open menu"
			>
				<Menu className="size-5" />
			</button>

			<div className="hidden h-9 max-w-md flex-1 items-center gap-2 rounded-md border border-border bg-muted/40 px-3 md:flex">
				<Search className="size-4 text-muted-foreground" />
				<input
					placeholder={searchPlaceholder}
					className="flex-1 bg-transparent text-sm outline-none"
				/>
				<kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
					⌘K
				</kbd>
			</div>

			<div className="flex-1 md:hidden" />

			{showDemoBadge && (
				<Badge variant="secondary" className="hidden md:inline-flex">
					Demo
				</Badge>
			)}

			{onDemoRoleChange && (
				<DropdownMenu>
					<DropdownMenuTrigger
                        render={
                            <Button variant="outline" size="sm" className="gap-2">
                                <UserCircle className="size-4" />
                                <span className="hidden sm:inline">View as: {meta.label}</span>
                                <ChevronDown className="size-3" />
                            </Button>
                        }
                    />
					<DropdownMenuContent align="end" className="w-64">
						<DropdownMenuLabel>Switch demo role</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{DEMO_SWITCHABLE_ROLES.map((r) => (
							<DropdownMenuItem key={r} onClick={() => onDemoRoleChange(r)}>
								<div className="flex flex-col">
									<span className="font-medium">{ROLE_META[r].label}</span>
									<span className="text-xs text-muted-foreground">
										{ROLE_META[r].description}
									</span>
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			)}

			<Button
				variant="ghost"
				size="icon"
				onClick={() =>
					setTheme(theme === "dark" ? "light" : "dark")
				}
				aria-label="Toggle theme"
			>
				{mounted && theme === "dark" ? (
					<Sun className="size-4" />
				) : (
					<Moon className="size-4" />
				)}
			</Button>

			<Button variant="ghost" size="icon" aria-label="Notifications">
				<Bell className="size-4" />
			</Button>
		</header>
	);
}