import { cookies } from "next/headers";
import { handleLayoutLocale } from "@/lib/i18n/utils";

// Components & UI
import { EditorSidebar } from "@/components/editor/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// Types & Interfaces
import type { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};



export default async function EditorLayout(
	{ children, params }: LayoutProps<"/[locale]/editor">
) {
	const { locale } = await params;
	handleLayoutLocale(locale);

	const cookieStore = await cookies();
	const sidebarState = cookieStore.get("SIDEBAR_STATE")?.value;
	const defaultOpen = sidebarState ? sidebarState === "true" : true;

	return (
		<SidebarProvider className="h-svh" defaultOpen={defaultOpen}>
			<EditorSidebar />
			<div className="flex-1 grid">
				{children}
			</div>
		</SidebarProvider>
	);
}