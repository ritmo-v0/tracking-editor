// Providers & Context
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { ShadcnProvider } from "@/lib/theme/provider";

// Components & UI
// import { Toaster } from "@/components/ui/sonner";



export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextIntlClientProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
				scriptProps={{ type: "application/json" }}
			>
				<ShadcnProvider>
					{children}
					{/* <Toaster /> */}
				</ShadcnProvider>
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}