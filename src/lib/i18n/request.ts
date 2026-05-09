import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

// Constants & Variables
import { routing } from "./routing";
import { FORMATS } from "./constants";



export default getRequestConfig(async ({ requestLocale }) => {
	const requestedLocale = await requestLocale;
	const locale = hasLocale(routing.locales, requestedLocale)
		? requestedLocale
		: routing.defaultLocale;

	return {
		locale,
		formats: FORMATS,
		messages: (await import(`./locales/${locale}.json`)).default,
	};
});