import { Check } from "lucide-react";

const STEPS = ["School details", "Admin account", "Confirm"];

export function RegisterStepper({ step }: { step: number }) {
	return (
		<div className="flex items-center gap-3 text-sm">
			{STEPS.map((label, i) => {
				const n = i + 1;
				return (
					<div key={label} className="flex items-center gap-3">
						<div
							className={`grid size-7 place-items-center rounded-full text-xs font-medium ${
								step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
							}`}
						>
							{step > n ? <Check className="size-3.5" /> : n}
						</div>
						<span className={step === n ? "font-medium" : "text-muted-foreground"}>{label}</span>
						{n < STEPS.length && <div className="h-px w-10 bg-border" />}
					</div>
				);
			})}
		</div>
	);
}