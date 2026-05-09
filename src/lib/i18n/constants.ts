export const LOCALES = ["en", "zh-TW"] as const;
export const DEFAULT_LOCALE = LOCALES[0];

export const FORMATS = {
	dateTime: {
		"2-digit": { year: "numeric", month: "2-digit", day: "2-digit" },
		numeric: { year: "numeric", month: "numeric", day: "numeric" },
		short: { year: "numeric", month: "short", day: "numeric" },
		long: { year: "numeric", month: "long", day: "numeric" },
		date: { month: "2-digit", day: "2-digit" },
		time: { hour: "2-digit", minute: "2-digit", hour12: false },
	},
	number: {
		compact: { notation: "compact", compactDisplay: "short" },
	},
	list: {
		enumeration: { type: "conjunction", style: "long" },
	},
} as const;

declare module "next-intl" {
	interface AppConfig {
		Locale: typeof LOCALES[number];
		Formats: typeof FORMATS;
	}
};