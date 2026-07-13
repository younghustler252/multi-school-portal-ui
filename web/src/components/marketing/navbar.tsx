"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/config/company";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex items-center gap-2">
					<Logo size={28} />
					<span className="font-semibold tracking-tight">{COMPANY.name}</span>
				</Link>

				<nav className="hidden items-center gap-8 text-sm font-medium md:flex">
					<Link href="/" className="text-foreground/80 hover:text-foreground">Home</Link>
					<Link href="/pricing" className="text-foreground/80 hover:text-foreground">Pricing</Link>
				</nav>

				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login">Log in</Link>} />
                    <Button size="sm" nativeButton={false} render={<Link href="/register">Get started</Link>} />
				</div>
			</div>
		</header>
	);
}