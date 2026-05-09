import { defineRouting } from "next-intl/routing";

// Constants & Variables
import { DEFAULT_LOCALE, LOCALES } from "./constants";

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	localePrefix: "never",
	localeCookie: {
		maxAge: 60 * 60 * 24 * 365,  // 1y
	},
});