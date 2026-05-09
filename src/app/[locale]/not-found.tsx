"use client";
import { useTranslations } from "next-intl";

// Components & UI
import { ButtonLink, H1, Wrapper } from "@/components/common/typography";

// Icons
import { ArrowLeftIcon } from "@phosphor-icons/react";



export default function NotFoundPage() {
	const t = useTranslations("not_found");

	return (
		<Wrapper className="grid place-content-center h-svh">
			<div className="grid gap-8 max-w-md text-center">
				<H1 className="text-balance whitespace-pre-wrap">
					{t("quote")}
				</H1>
				<div>
					<ButtonLink href="/" size="lg">
						<ArrowLeftIcon data-icon="inline-start" />
						{t("back_to_home")}
					</ButtonLink>
				</div>
			</div>
		</Wrapper>
	);
}