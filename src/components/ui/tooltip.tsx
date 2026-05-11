import { cn } from "@/lib/utils";

// Components & UI
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";



function TooltipProvider({
	delay = 500,
	closeDelay = 50,
	...props
}: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			closeDelay={closeDelay}
			{...props}
		/>
	);
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	children,
	align = "center",
	alignOffset = 0,
	side = "top",
	sideOffset = 8,
	collisionPadding = 16,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<
		TooltipPrimitive.Positioner.Props,
		"align" | "alignOffset" | "collisionPadding" | "side" | "sideOffset"
	>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"inline-flex items-center gap-1.5 max-w-xs w-fit px-3 py-1.5 has-data-[slot=kbd]:pr-1.5 bg-foreground text-xs text-background rounded-none",
						"transition-[transform,scale,opacity] data-instant:transition-none origin-(--transform-origin)",
						"data-starting-style:scale-95 data-starting-style:opacity-0",
						"data-ending-style:scale-95 data-ending-style:opacity-0",
						className,
					)}
					{...props}
				>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
};