"use client";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Twemoji } from "./twemoji";
import { buttonVariants } from "@/components/ui/button";
import { Link as NextLink } from "@/lib/i18n/navigation";

// Types & Interfaces
import type { VariantProps } from "class-variance-authority";



function Wrapper({
	className,
	width = 1400,
	boxSizing = "content",
	render,
	...props
}: useRender.ComponentProps<"div"> & {
	boxSizing?: "border" | "content";
	width?: number;
}) {
	return useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(
			{
				style: { "--max-width": `${width}px` } as React.CSSProperties,
				className: cn(
					"@container mx-auto max-inline-(--max-width) px-4 md:px-8",
					"data-[box-sizing=border]:box-border data-[box-sizing=content]:box-content",
					className,
				),
			},
			props
		),
		state: {
			"box-sizing": boxSizing,
		},
	});
}

function Section({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			className={cn(
				"py-6",
				"has-[>:first-child:is(h1)]:py-8",
				"has-[>:first-child:is(h2)]:py-6",
				"has-[>:first-child:is(h3)]:py-3",
				"has-[>:first-child:is(h4)]:py-2",
				"has-[>:first-child:is(h5,h6)]:py-1",
				className,
			)}
			{...props}
		/>
	);
}

function H1({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h1">) {
	return useRender({
		defaultTagName: "h1",
		render,
		props: mergeProps<"h1">(
			{
				className: cn(
					"font-heading font-bold text-3xl/tight tracking-tight scroll-m-20",
					"mt-12 first:mt-0 [&>strong]:font-bold [&+p]:mt-4!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H2({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h2">) {
	return useRender({
		defaultTagName: "h2",
		render,
		props: mergeProps<"h2">(
			{
				className: cn(
					"font-heading font-semibold text-2xl/tight tracking-tight scroll-m-20",
					"mt-8 first:mt-0 [&>strong]:font-semibold [&+p]:mt-4!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H3({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h3">) {
	return useRender({
		defaultTagName: "h3",
		render,
		props: mergeProps<"h3">(
			{
				className: cn(
					"font-heading font-semibold text-xl/tight tracking-tight scroll-m-20",
					"mt-6 first:mt-0 [&>strong]:font-semibold [&+p]:mt-4!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H4({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h4">) {
	return useRender({
		defaultTagName: "h4",
		render,
		props: mergeProps<"h4">(
			{
				className: cn(
					"font-heading font-semibold text-lg/tight tracking-tight scroll-m-20",
					"mt-4 first:mt-0 [&>strong]:font-semibold [&+p]:mt-2!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H5({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h5">) {
	return useRender({
		defaultTagName: "h5",
		render,
		props: mergeProps<"h5">(
			{
				className: cn(
					"font-heading font-medium text-base/tight tracking-tight scroll-m-20",
					"mt-4 first:mt-0 [&>strong]:font-medium [&+p]:mt-2!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function H6({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"h6">) {
	return useRender({
		defaultTagName: "h6",
		render,
		props: mergeProps<"h6">(
			{
				className: cn(
					"font-heading font-medium text-base/tight tracking-tight scroll-m-20",
					"mt-4 first:mt-0 [&>strong]:font-medium [&+p]:mt-2!",
					className,
				),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function P({
	className,
	children,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"leading-relaxed wrap-break-word not-first:mt-8 [&+p]:mt-4!",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</p>
	);
}

function Muted({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"p">) {
	return useRender({
		defaultTagName: "p",
		render,
		props: mergeProps<"p">(
			{
				className: cn("text-muted-foreground text-sm", className),
				children: <Twemoji>{children}</Twemoji>,
			},
			props
		),
	});
}

function HR({ className, ...props }: React.ComponentProps<"hr">) {
	return (
		<hr
			className={cn("my-8 border-t has-[+h1]:mt-12", className)}
			{...props}
		/>
	);
}

function UL({ className, children, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			className={cn(
				"list-disc list-outside not-first:mt-2 pl-6 marker:text-primary",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</ul>
	);
}

function OL({ className, children, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			className={cn(
				"list-decimal list-outside not-first:mt-2 pl-6 marker:text-primary",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</ol>
	);
}

function LI({
	className,
	children,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			className={cn(
				"my-1.5 pl-1 leading-relaxed [&_ul]:mt-0! [&_ol]:mt-0!",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</li>
	);
}

function Code({
	className,
	children,
	...props
}: React.ComponentProps<"code">) {
	return (
		<code
			className={cn(
				"px-1.5 py-0.75 bg-muted font-mono text-[0.875em] text-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 rounded-md",
				className,
			)}
			{...props}
		>
			<Twemoji>{children}</Twemoji>
		</code>
	);
}

const linkVariants = cva(
	[
		"outline-none transition-colors",
		"focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
	],
	{
		variants: {
			variant: {
				default: "font-medium text-primary underline-offset-4 underline hover:text-primary/60",
				hover: [
					"shrink-0 inline-flex items-center justify-center gap-2 w-max font-medium text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground",
					"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				],
				ghost: "hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground",
				nothing: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Link({
	className,
	variant = "default",
	href,
	...props
}: React.ComponentProps<typeof NextLink> & VariantProps<typeof linkVariants>) {
	const s = href.toString();
	const isExternal = !(s.startsWith("/") || s.startsWith("#"));

	return (
		<NextLink
			href={href}
			className={cn(linkVariants({ variant }), className)}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			{...props}
		/>
	);
}

function ButtonLink({
	className,
	variant = "default",
	size = "default",
	href,
	...props
}: React.ComponentProps<typeof NextLink> & VariantProps<typeof buttonVariants>) {
	return (
		<Link
			href={href}
			variant="nothing"
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

function IFrame({
	className,
	...props
}: React.ComponentProps<"iframe">) {
	return (
		<iframe
			className={cn("w-full aspect-video", className)}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
			{...props}
		/>
	);
}

export {
	Wrapper, Section,
	H1, H2, H3, H4, H5, H6,
	P, Muted, HR, UL, OL, LI, Code,
	Link, ButtonLink, IFrame,
};