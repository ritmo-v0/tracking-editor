// shadcn
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Types & Interfaces
import type { Metadata } from "next";
import type {
	OpenGraph,
	OpenGraphType,
} from "next/dist/lib/metadata/types/opengraph-types";

type PageTitleProps = {
	title?: string;
	suffix?: string;
};

// Constants & Variables
export const PAGE_TITLE_SUFFIX = "Tracking!";



// # Metadata Functions
export function getBaseUrl() {
	const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
	const baseUrl = PRODUCTION_URL
		? `https://${PRODUCTION_URL}`
		: `https://localhost:${process.env.PORT || 3000}`;

	return new URL(baseUrl);
}

export function generatePageTitle({
	title = "%s",
	suffix = PAGE_TITLE_SUFFIX
}: Partial<PageTitleProps> = {}): string {
	return `${title} - ${suffix}`;
}

export function generateSocialMetadata({
	type = "website",
	title,
	description,
	url,
	images,
	locale = "en_US",
}: Partial<OpenGraph & { type: OpenGraphType }>): Partial<Metadata> {
	const ogLocale = locale.replace("-", "_");

	return {
		openGraph: {
			type,
			title,
			description,
			url,
			images,
			siteName: PAGE_TITLE_SUFFIX,
			locale: ogLocale,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images,
			site: "@ritmo_v0",
			siteId: "904003428262723584",
			creator: "@ritmo_v0",
			creatorId: "904003428262723584",
		},
	};
}

// # Utility Functions
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}