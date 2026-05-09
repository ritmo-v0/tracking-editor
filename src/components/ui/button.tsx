import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Button as ButtonPrimitive } from "@base-ui/react/button";



const buttonVariants = cva(
	[
		"group/button shrink-0 inline-flex items-center justify-center bg-clip-padding font-medium text-xs border border-transparent outline-none rounded-none transition select-none whitespace-nowrap",
		"active:not-aria-[haspopup]:translate-y-px",
		"focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
		"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
		"disabled:opacity-50 disabled:pointer-events-none",
		"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
	],
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				destructive: "bg-destructive/10 dark:bg-destructive/20 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/30 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
				outline: "bg-background dark:bg-input/30 border-border dark:border-input hover:bg-muted dark:hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default:
					"gap-1.5 h-8 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
				xs: "gap-1 h-6 px-2 text-xs has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "gap-1 h-7 px-2.5 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "gap-1.5 h-9 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
				icon: "size-8",
				"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-7",
				"icon-lg": "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Button, buttonVariants };