import { cn } from "@/lib/utils";

// Components & UI
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";



export function EditorSidebarHeader() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<div className={cn(
						"flex items-center gap-2 h-8",
						"transition-all ease-out-expo duration-200",
						"group-data-[collapsible=icon]:w-8",
					)}>
						<SidebarTrigger className="size-8 ml-auto" />
					</div>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}