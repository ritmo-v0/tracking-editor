import { cn } from "@/lib/utils";

// Components & UI
import {
	SidebarFooter,
	SidebarMenu,
} from "@/components/ui/sidebar";



export function EditorSidebarFooter({
	className,
	...props
}: React.ComponentProps<typeof SidebarFooter>) {
	return (
		<SidebarFooter className={cn("border-t", className)} {...props}>
			<SidebarMenu>
				{/*  */}
			</SidebarMenu>
		</SidebarFooter>
	);
}