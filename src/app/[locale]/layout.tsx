import "@/app/globals.css";
import {
	cn,
	getBaseUrl,
	generatePageTitle,
	generateSocialMetadata,
} from "@/lib/utils";

// next-intl
import { getTranslations } from "next-intl/server";
import { handleLayoutLocale } from "@/lib/i18n/utils";
import { routing } from "@/lib/i18n/routing";

// Components & UI
import { Providers } from "@/lib/providers";

// Fonts
import {
	JetBrains_Mono,
	Noto_Sans_JP,
	Noto_Sans_TC,
} from "next/font/google";
const JetBrainsMono = JetBrains_Mono({
	weight: "variable",
	style: ["normal", "italic"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
});
const NotoSansJP = Noto_Sans_JP({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-jp",
});
const NotoSansTC = Noto_Sans_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
});

// Types & Interfaces
import type { Metadata } from "next";
import type { Locale } from "next-intl";

// Constants & Variables
const url = "/";

// Metadata
export async function generateMetadata(
	{ params }: LayoutProps<"/[locale]">
): Promise<Metadata> {
	const locale = (await params).locale as Locale;
	const t = await getTranslations({ locale, namespace: "metadata.homepage" });

	const title = t("title");
	const description = t("description");

	return {
		metadataBase: getBaseUrl(),
		title: {
			default: title,
			template: generatePageTitle(),
		},
		description,
		...generateSocialMetadata({ title, description, url }),
		icons: {
			icon: [{ url: "/icon.svg" }],
			apple: [{ url: "/apple-icon.png" }],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}



export default async function RootLayout(
	{ children, params }: LayoutProps<"/[locale]">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			className={cn(
				JetBrainsMono.variable,
				NotoSansJP.variable,
				NotoSansTC.variable,
			)}
			suppressHydrationWarning
		>
			{/* <head>
				<script
					src="//unpkg.com/react-scan/dist/auto.global.js"
					crossOrigin="anonymous" async
				/>
			</head> */}
			<body>
				<Providers>
					<div className="min-h-svh isolate">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}