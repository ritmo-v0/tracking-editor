// Types & Interfaces
import type { ThemeStyles } from "./types";

// Constants & Variables
export const DEFAULT_FONT_SANS =
	'"JetBrains Mono", "JetBrains Mono Fallback", "Noto Sans TC", "Noto Sans TC Fallback", "Noto Sans JP", "Noto Sans JP Fallback", monospace';
export const DEFAULT_FONT_SERIF =
	'';
export const DEFAULT_FONT_MONO =
	'"JetBrains Mono", "JetBrains Mono Fallback", "Noto Sans TC", "Noto Sans TC Fallback", "Noto Sans JP", "Noto Sans JP Fallback", monospace';

export const PRESETS = {
	default: {
		light: {
			background: "oklch(1 0 0)",
			foreground: "oklch(0.145 0 0)",
			card: "oklch(1 0 0)",
			"card-foreground": "oklch(0.145 0 0)",
			popover: "oklch(1 0 0)",
			"popover-foreground": "oklch(0.145 0 0)",
			primary: "oklch(0.205 0 0)",
			"primary-foreground": "oklch(0.985 0 0)",
			secondary: "oklch(0.97 0 0)",
			"secondary-foreground": "oklch(0.205 0 0)",
			muted: "oklch(0.97 0 0)",
			"muted-foreground": "oklch(0.556 0 0)",
			accent: "oklch(0.205 0 0)",
			"accent-foreground": "oklch(0.985 0 0)",
			destructive: "oklch(0.577 0.245 27.325)",
			border: "oklch(0.922 0 0)",
			input: "oklch(0.922 0 0)",
			ring: "oklch(0.708 0 0)",
			"chart-1": "oklch(0.87 0 0)",
			"chart-2": "oklch(0.556 0 0)",
			"chart-3": "oklch(0.439 0 0)",
			"chart-4": "oklch(0.371 0 0)",
			"chart-5": "oklch(0.269 0 0)",
			sidebar: "oklch(0.985 0 0)",
			"sidebar-foreground": "oklch(0.145 0 0)",
			"sidebar-primary": "oklch(0.205 0 0)",
			"sidebar-primary-foreground": "oklch(0.985 0 0)",
			"sidebar-accent": "oklch(0.97 0 0)",
			"sidebar-accent-foreground": "oklch(0.205 0 0)",
			"sidebar-border": "oklch(0.922 0 0)",
			"sidebar-ring": "oklch(0.708 0 0)",

			radius: "0.625rem",
			"font-sans": DEFAULT_FONT_SANS,
			"font-serif": DEFAULT_FONT_SERIF,
			"font-mono": DEFAULT_FONT_MONO,
			"shadow-color": "hsl(0 0% 0%)",
			"shadow-opacity": "0.1",
			"shadow-blur": "3px",
			"shadow-spread": "0px",
			"shadow-offset-x": "0",
			"shadow-offset-y": "1px",
			"letter-spacing": "0em",
			spacing: "0.25rem",
		},
		dark: {
			background: "oklch(0.145 0 0)",
			foreground: "oklch(0.985 0 0)",
			card: "oklch(0.205 0 0)",
			"card-foreground": "oklch(0.985 0 0)",
			popover: "oklch(0.205 0 0)",
			"popover-foreground": "oklch(0.985 0 0)",
			primary: "oklch(0.922 0 0)",
			"primary-foreground": "oklch(0.205 0 0)",
			secondary: "oklch(0.269 0 0)",
			"secondary-foreground": "oklch(0.985 0 0)",
			muted: "oklch(0.269 0 0)",
			"muted-foreground": "oklch(0.708 0 0)",
			accent: "oklch(0.922 0 0)",
			"accent-foreground": "oklch(0.205 0 0)",
			destructive: "oklch(0.704 0.191 22.216)",
			border: "oklch(1 0 0 / 10%)",
			input: "oklch(1 0 0 / 15%)",
			ring: "oklch(0.556 0 0)",
			"chart-1": "oklch(0.87 0 0)",
			"chart-2": "oklch(0.556 0 0)",
			"chart-3": "oklch(0.439 0 0)",
			"chart-4": "oklch(0.371 0 0)",
			"chart-5": "oklch(0.269 0 0)",
			sidebar: "oklch(0.205 0 0)",
			"sidebar-foreground": "oklch(0.985 0 0)",
			"sidebar-primary": "oklch(0.488 0.243 264.376)",
			"sidebar-primary-foreground": "oklch(0.985 0 0)",
			"sidebar-accent": "oklch(0.269 0 0)",
			"sidebar-accent-foreground": "oklch(0.985 0 0)",
			"sidebar-border": "oklch(1 0 0 / 10%)",
			"sidebar-ring": "oklch(0.556 0 0)",
		},
	},
} as const satisfies Record<string, ThemeStyles>;

export const PRESET_IDS = Object.keys(PRESETS) as Array<keyof typeof PRESETS>;