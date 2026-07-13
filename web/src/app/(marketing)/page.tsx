import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { NigeriaFeatures } from "@/components/marketing/nigeria-features";
import { RoleShowcase } from "@/components/marketing/role-showcase";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
	title: "SchoolOS — School Management Software for Nigerian Schools",
	description:
		"Replace paper registers and spreadsheets with one digital system for attendance, WAEC-scale grading, report cards, and fee collection — built for Nigerian primary and secondary schools.",
};

export default function HomePage() {
	return (
		<>
			<Hero />
			<NigeriaFeatures />
			<RoleShowcase />
			<CtaBand />
		</>
	);
}