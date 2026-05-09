"use client";
import { parse } from "@twemoji/parser";
import { cn } from "@/lib/utils";

// Components & UI
import NextImage from "next/image";
import { Fragment } from "react";

// Types & Interfaces
import type { ParsingOptions } from "@twemoji/parser";
export type TwemojiParsingOptions = {
	className?: string;
} & ParsingOptions;



export function Twemoji({
	children,
	...props
}: TwemojiParsingOptions & { children?: React.ReactNode }) {
	return <>{parseChildren(children, props)}</>;
}

function parseChildren(
	children?: React.ReactNode,
	options?: TwemojiParsingOptions
): React.ReactNode {
	if (typeof children === "string") return parseString(children, options);
	if (Array.isArray(children)) {
		return children.map((child, index) => (
			<Fragment key={index}>
				{parseChildren(child, options)}
			</Fragment>
		))
	}

	return children;
}

function parseString(
	string: string,
	options?: TwemojiParsingOptions
): React.ReactNode {
	const entities = parse(string, options);
	const nodes: React.ReactNode[] = [];

	let lastIndex = 0;
	for (const entity of entities) {
		const { text, url, indices } = entity;

		if (indices[0] > lastIndex) {
			nodes.push(string.slice(lastIndex, indices[0]));
		}

		if (url) {
			nodes.push(
				<NextImage
					key={indices[0]}
					src={url}
					alt={text}
					width={24}
					height={24}
					draggable={false}
					loading="lazy"
					unoptimized
					className={cn(
						"inline size-[1.1em] mx-[0.15em] align-[-0.2em]",
						options?.className,
					)}
				/>
			);
		}

		lastIndex = indices[1];
	}

	if (lastIndex < string.length) {
		nodes.push(string.slice(lastIndex));
	}

	return nodes;
}