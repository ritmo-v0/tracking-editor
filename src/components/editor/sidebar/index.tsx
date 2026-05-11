// Components & UI
import { EditorSidebarHeader } from "./header";
import { EditorSidebarContent } from "./content";
import { EditorSidebarFooter } from "./footer";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";



export function EditorSidebar() {
	return (
		<Sidebar collapsible="icon">
			<EditorSidebarHeader />
			<EditorSidebarContent />
			<EditorSidebarFooter className="mt-auto" />
			<SidebarRail />
		</Sidebar>
	);
}