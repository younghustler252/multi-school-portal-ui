import { GraduationCap, Wallet, CalendarDays } from "lucide-react";

const FEATURES = [
	{
		icon: GraduationCap,
		title: "WAEC-scale grading, built in",
		description:
			"A1 to F9 grading comes configured out of the box — matching how Nigerian schools already report results. Override it per school on Pro plans if you use a different scale.",
	},
	{
		icon: Wallet,
		title: "Fees that make sense locally",
		description:
			"Every amount is tracked precisely in kobo, invoiced per term, and collected via Paystack, Flutterwave, or manual bank transfer — the ways Nigerian parents actually pay.",
	},
	{
		icon: CalendarDays,
		title: "Sessions and terms, not semesters",
		description:
			"Your academic calendar — session, First/Second/Third term — is the backbone of every record: attendance, grades, and fees all scope to the term they belong to.",
	},
];

export function NigeriaFeatures() {
	return (
		<section className="border-t border-border bg-card/40 py-16 md:py-24">
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<div className="max-w-2xl">
					<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
						Not adapted for Nigerian schools. Built for them.
					</h2>
					<p className="mt-3 text-muted-foreground">
						No awkward workarounds for grading scales, currency, or calendars —
						the system already speaks your school&apos;s language.
					</p>
				</div>

				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.title}
								className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm"
							>
								<div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
									<Icon className="size-5" />
								</div>
								<h3 className="mt-4 font-semibold">{feature.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}