"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeStore } from "@/lib/store/theme";
import {
	applyThemeColors,
	applyThemeCommonStyles,
	getPresetThemeStyles,
} from "@/lib/theme/utils";



export function ShadcnProvider({ children }: { children: React.ReactNode }) {
	const { preset } = useThemeStore();
	const { resolvedTheme: mode } = useTheme();

	useEffect(() => {
		const root = document.documentElement;
		const theme = getPresetThemeStyles(preset);

		if (mode === "light" || mode === "dark") {
			applyThemeColors(root, theme, mode);
			applyThemeCommonStyles(root, theme);
		}
	}, [preset, mode]);

	return children;
}