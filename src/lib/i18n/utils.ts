import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

// Constants & Variables
import { routing } from "./routing";



export function handleLayoutLocale(locale: string) {
	// Enable static rendering
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);
}