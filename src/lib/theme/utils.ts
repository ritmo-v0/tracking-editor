// Types & Interfaces
import type { PresetId, ThemeStyles, ThemeStyleProps } from "./types";
type CommonStyle = typeof COMMON_STYLES[number];

// Constants & Variables
import { PRESETS } from "./presets";
const COMMON_STYLES = [
	"font-sans",
	"font-serif",
	"font-mono",
	"radius",
	"shadow-opacity",
	"shadow-blur",
	"shadow-spread",
	"shadow-offset-x",
	"shadow-offset-y",
	"letter-spacing",
	"spacing",
] as const satisfies readonly (keyof ThemeStyleProps)[];



export function getPresetThemeStyles(id: PresetId): ThemeStyles {
	const preset = PRESETS[id];
	if (!preset) return PRESETS.default;

	return {
		light: {
			...PRESETS.default.light,
			...(preset.light || {}),
		},
		dark: {
			...PRESETS.default.dark,
			...(preset.dark || {}),
		},
	};
}

export function getThemeColor(
	preset: PresetId,
	color: keyof ThemeStyleProps
) {
	const theme = getPresetThemeStyles(preset);
	return theme?.light?.[color] || theme?.dark?.[color] || "#000000";
}

export function applyThemeColors(
	root: HTMLElement,
	themeStyles: ThemeStyles,
	mode: keyof ThemeStyles
) {
	Object.entries(themeStyles[mode])
		.filter(([key]) => !COMMON_STYLES.includes(key as CommonStyle))
		.forEach(([key, value]) => {
			if (typeof value === "string") {
				root.style.setProperty(`--${key}`, value);
			}
		});
}

export function applyThemeCommonStyles(
	root: HTMLElement,
	themeStyles: ThemeStyles
) {
	Object.entries(themeStyles.light)
		.filter(([key]) => COMMON_STYLES.includes(key as CommonStyle))
		.forEach(([key, value]) => {
			if (typeof value === "string") {
				root.style.setProperty(`--${key}`, value);
			}
		});
}