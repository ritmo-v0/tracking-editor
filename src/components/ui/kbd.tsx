import { cn } from "@/lib/utils";



function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"inline-flex items-center justify-center gap-1 min-w-5 w-fit h-5 px-1 bg-muted text-muted-foreground font-sans font-medium text-xs rounded-none select-none pointer-events-none",
				"in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };