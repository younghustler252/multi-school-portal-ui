import Image from "next/image";
import { COMPANY } from "@/config/company";

interface LogoProps {
	logoUrl?: string | null; // pass a school's custom logo when white-labeling is active
	name?: string;
	size?: number;
}

export function Logo({ logoUrl, name, size = 32 }: LogoProps) {
	const src = logoUrl ?? COMPANY.logoUrl;
	const displayName = name ?? COMPANY.name;

	if (src) {
		return (
			<Image
				src={src}
				alt={displayName}
				width={size}
				height={size}
				className="rounded-lg object-contain"
			/>
		);
	}

	// Fallback: letter avatar — used when a school hasn't uploaded a logo yet
	return (
		<div
			style={{ width: size, height: size }}
			className="rounded-lg bg-primary grid place-items-center text-primary-foreground font-bold"
		>
			{displayName.charAt(0).toUpperCase()}
		</div>
	);
}