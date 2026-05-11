import { cn } from "@/lib/utils";

// Components & UI
import { Input as InputPrimitive } from "@base-ui/react/input";



export function Input({ className, type, ...props }: InputPrimitive.Props) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"flex px-2.5 py-1 min-w-0 w-full h-8 bg-transparent dark:bg-input/30 text-xs md:text-xs rounded-none border border-input transition-colors outline-none",
				"file:inline-flex file:h-6 file:font-medium file:text-foreground file:text-xs file:bg-transparent file:border-0",
				"placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-input/50 dark:disabled:bg-input/80",
				"focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
				"aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}