"use client";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/use-mobile";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons & Images
import { SidebarSimpleIcon } from "@phosphor-icons/react";

// Types & Interfaces
type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

// Constants & Variables
const SIDEBAR_COOKIE_NAME = "SIDEBAR_STATE";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;  // 1y
const SIDEBAR_WIDTH = "20rem";
const SIDEBAR_WIDTH_MOBILE = "20rem";
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Hooks & Contexts
const SidebarContext = createContext<SidebarContextProps | null>(null);

function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");

	return context;
}



function SidebarProvider({
	className,
	children,
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	style,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = useState(false);

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = useCallback(
		async (value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value;
			if (setOpenProp) setOpenProp(openState);
			else _setOpen(openState);

			// This sets the cookie to keep the sidebar state.
			try {
				await cookieStore.set({
					name: SIDEBAR_COOKIE_NAME,
					value: String(openState),
					path: "/",
					expires: Date.now() + SIDEBAR_COOKIE_MAX_AGE * 1000,
				});
			} catch (error) {
				console.error("Failed to set sidebar cookie:", error);
			}
		},
		[setOpenProp, open]
	);

	// Helper to toggle the sidebar.
	const toggleSidebar = useCallback(() => {
		return isMobile
			? setOpenMobile((open) => !open)
			: setOpen((open) => !open);
	}, [isMobile, setOpen]);

	// Adds a keyboard shortcut to toggle the sidebar.
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? "expanded" : "collapsed";

	const contextValue = useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, toggleSidebar]
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delay={0}>
				<div
					data-slot="sidebar-wrapper"
					style={{
						"--sidebar-width": SIDEBAR_WIDTH,
						"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
						...style,
					} as React.CSSProperties}
					className={cn(
						"group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
						className,
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
}

function Sidebar({
	className,
	children,
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	dir,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={cn(
					"flex flex-col w-(--sidebar-width) h-full bg-sidebar text-sidebar-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
				<SheetContent
					dir={dir}
					data-slot="sidebar"
					data-sidebar="sidebar"
					data-mobile="true"
					className="w-(--sidebar-width) p-0 bg-sidebar text-sidebar-foreground [&>button]:hidden"
					style={{
						"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
					} as React.CSSProperties}
					side={side}
					showCloseButton={false}
				>
					<SheetHeader className="sr-only">
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div className="flex flex-col size-full">{children}</div>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<div
			className="group peer hidden md:block text-sidebar-foreground"
			data-slot="sidebar"
			data-side={side}
			data-variant={variant}
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					"relative w-(--sidebar-width) bg-transparent",
					"transition-[width] ease-out-expo duration-200",
					"group-data-[collapsible=offcanvas]:w-0",
					"group-data-[side=right]:rotate-180",
					variant === "floating" || variant === "inset"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
				)}
			/>
			<div
				data-slot="sidebar-container"
				data-side={side}
				className={cn(
					"fixed inset-y-0 hidden md:flex w-(--sidebar-width) h-svh",
					"transition-[left,right,width] ease-out-expo duration-200",
					"data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:-left-(--sidebar-width)",
					"data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:-right-(--sidebar-width)",
					// Adjust the padding for floating and inset variants.
					variant === "floating" || variant === "inset"
						? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
					className,
				)}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className={cn(
						"flex flex-col size-full bg-sidebar",
						"group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
						"group-data-[variant=floating]:rounded-none group-data-[variant=floating]:shadow-sm",
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function SidebarTrigger({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { open, toggleSidebar } = useSidebar();
	const t = useTranslations("sidebar");

	const label = open ? t("close") : t("open");

	return (
		<Tooltip>
			<TooltipTrigger render={
				<Button
					data-slot="sidebar-trigger"
					data-sidebar="trigger"
					variant="ghost"
					size="icon-sm"
					className={cn(className)}
					onClick={(e) => {
						onClick?.(e);
						toggleSidebar();
					}}
					aria-label={label}
					{...props}
				/>
			}>
				<SidebarSimpleIcon aria-hidden="true" />
			</TooltipTrigger>
			<TooltipContent
				side="right"
				sideOffset={4}
				collisionPadding={8}
			>
				<div className="flex items-center gap-2">
					<span>{label}</span>
					<KbdGroup>
						<Kbd>Ctrl</Kbd>
						<Kbd>B</Kbd>
					</KbdGroup>
				</div>
			</TooltipContent>
		</Tooltip>
	);
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
	const { open, toggleSidebar } = useSidebar();
	const t = useTranslations("sidebar");

	const label = open ? t("close") : t("open");

	return (
		<button
			data-slot="sidebar-rail"
			data-sidebar="rail"
			title={label}
			onClick={toggleSidebar}
			className={cn(
				"absolute inset-y-0 hidden sm:flex w-4 ltr:-translate-x-1/2 rtl:-translate-x-1/2 z-20",
				"transition-all ease-out-expo duration-200",
				"group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
				"group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar",
				"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				"after:absolute after:inset-y-0 after:inset-s-1/2 after:w-0.5 hover:after:bg-sidebar-border",
				className,
			)}
			aria-label={label}
			aria-expanded={open}
			tabIndex={-1}
			{...props}
		/>
	);
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"flex-1 relative flex flex-col w-full bg-background",
				"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0",
				"md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-sm",
				"md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn("w-full h-8 bg-background shadow-none", className)}
			{...props}
		/>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}

function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("mx-2 w-auto bg-sidebar-border", className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"flex-1 flex flex-col gap-0 min-h-0 overflow-auto scrollbar-none",
				"group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn("relative flex flex-col min-w-0 w-full p-2", className)}
			{...props}
		/>
	);
}

function SidebarGroupLabel({
	className,
	render,
	...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"shrink-0 flex items-center h-8 px-2 font-medium text-xs text-sidebar-foreground/70 ring-sidebar-ring outline-hidden rounded-none",
					"transition-[margin,opacity] ease-out-expo duration-200",
					"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
					"focus-visible:ring-2",
					"[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:pointer-events-none",
					className,
				),
			},
			props
		),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label",
		},
	});
}

function SidebarGroupAction({
	className,
	render,
	...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"absolute top-3.5 right-3",
					"flex items-center justify-center w-5 p-0 ring-sidebar-ring outline-hidden rounded-none aspect-square transition-transform group-data-[collapsible=icon]:hidden",
					"text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
					"focus-visible:ring-2",
					"[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:pointer-events-none",
					"md:after:hidden after:absolute after:-inset-2",
					className,
				),
			},
			props
		),
		render,
		state: {
			slot: "sidebar-group-action",
			sidebar: "group-action",
		},
	});
}

function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("w-full text-xs", className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex flex-col gap-0 min-w-0 w-full", className)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	);
}

const sidebarMenuButtonVariants = cva(
	[
		"group/menu-button peer/menu-button flex items-center gap-2 w-full px-3 py-2 data-active:font-medium text-xs text-left ring-sidebar-ring focus-visible:ring-2 outline-hidden rounded-none transition-[width,height,padding] overflow-hidden",
		"group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! group-has-data-[sidebar=menu-action]/menu-item:pr-8",
		"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
		"active:bg-sidebar-accent active:text-sidebar-accent-foreground",
		"data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:font-medium",
		"data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground",
		"disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
		"[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:pointer-events-none [&>svg]:text-sidebar-accent-foreground",
		"[&>span:last-child]:opacity-100 [&>span:last-child]:truncate [&>span:last-child]:group-data-[collapsible=icon]:opacity-0 [&>span:last-child]:transition-opacity",
	],
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-xs",
				sm: "h-7 text-xs",
				lg: "h-12 text-xs group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function SidebarMenuButton({
	className,
	render,
	variant = "default",
	size = "default",
	isActive = false,
	tooltip,
	...props
}: useRender.ComponentProps<"button"> &
	React.ComponentProps<"button"> & {
		isActive?: boolean;
		tooltip?: string | React.ComponentProps<typeof TooltipContent>;
	} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(sidebarMenuButtonVariants({ variant, size }), className),
			},
			props
		),
		render,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive,
		},
	});

	if (!tooltip) return comp;

	if (typeof tooltip === "string") tooltip = { children: tooltip };

	return (
		<Tooltip>
			<TooltipTrigger render={comp} />
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	);
}

function SidebarMenuAction({
	className,
	render,
	showOnHover = false,
	...props
}: useRender.ComponentProps<"button"> &
	React.ComponentProps<"button"> & {
		showOnHover?: boolean;
	}) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"absolute top-1.5 right-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=sm]/menu-button:top-1 peer-data-[size=lg]/menu-button:top-2.5",
					"flex items-center justify-center size-5 p-0 text-sidebar-foreground focus-visible:ring-2 ring-sidebar-ring outline-hidden rounded-none transition-transform group-data-[collapsible=icon]:hidden",
					"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground",
					"after:absolute after:-inset-2 md:after:hidden",
					"[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:pointer-events-none",
					showOnHover && "peer-data-active/menu-button:text-sidebar-accent-foreground group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100 aria-expanded:opacity-100 md:opacity-0",
					className,
				),
			},
			props
		),
		render,
		state: {
			slot: "sidebar-menu-action",
			sidebar: "menu-action",
		},
	});
}

function SidebarMenuBadge({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				"absolute right-1 group-data-[collapsible=icon]:hidden",
				"flex items-center justify-center min-w-5 h-5 px-1 font-medium tabular-nums text-xs text-sidebar-foreground rounded-none pointer-events-none select-none",
				"peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground",
				"peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=sm]/menu-button:top-1 peer-data-[size=lg]/menu-button:top-2.5",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: React.ComponentProps<"div"> & {
	showIcon?: boolean;
}) {
	// Random width between 50 to 90%.
	const [width] = useState(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`
	});

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn("flex items-center gap-2 h-8 px-2 rounded-none", className)}
			{...props}
		>
			{showIcon && (
				<Skeleton
					className="size-4 rounded-none"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="flex-1 max-w-(--skeleton-width) h-4"
				data-sidebar="menu-skeleton-text"
				style={{ "--skeleton-width": width } as React.CSSProperties}
			/>
		</div>
	);
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn(
				"flex flex-col gap-1 mx-3.5 min-w-0 px-2.5 py-0.5 border-l border-sidebar-border translate-x-px group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarMenuSubItem({
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={cn("group/menu-sub-item relative", className)}
			{...props}
		/>
	);
}

function SidebarMenuSubButton({
	className,
	render,
	size = "md",
	isActive = false,
	...props
}: useRender.ComponentProps<"a"> &
	React.ComponentProps<"a"> & {
		size?: "sm" | "md";
		isActive?: boolean;
	}) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps<"a">(
			{
				className: cn(
					"flex items-center gap-2 min-w-0 h-7 px-2 text-sidebar-foreground ring-sidebar-ring focus-visible:ring-2 outline-hidden rounded-none -translate-x-px overflow-hidden group-data-[collapsible=icon]:hidden",
					"data-[size=md]:text-xs data-[size=sm]:text-xs",
					"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
					"active:bg-sidebar-accent active:text-sidebar-accent-foreground",
					"data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground",
					"disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
					"[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:pointer-events-none [&>svg]:text-sidebar-accent-foreground",
					"[&>span:last-child]:opacity-100 [&>span:last-child]:truncate [&>span:last-child]:group-data-[collapsible=icon]:opacity-0 [&>span:last-child]:transition-opacity",
					className,
				),
			},
			props
		),
		render,
		state: {
			slot: "sidebar-menu-sub-button",
			sidebar: "menu-sub-button",
			size,
			active: isActive,
		},
	});
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
};