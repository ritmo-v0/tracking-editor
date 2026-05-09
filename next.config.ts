import createNextIntlPlugin from "next-intl/plugin";

// Types & Interfaces
import type { NextConfig } from "next";

// Config
const config: NextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === "production"
			? { exclude: ["error"] }
			: false,
	},
	devIndicators: false,
	images: {
		remotePatterns: [],
	},
	typedRoutes: true,
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
export default withNextIntl(config);