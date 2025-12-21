import { websiteUrl } from "@lib/constants";
import type { Metadata } from "next";

interface MetadataProps {
	lang: string;
	title: string;
	description?: string;
	image?: string;
	type?: "website" | "article";
	authors?: string[];
	path: string;
	siteName: string;
}

export function createMetadata({
	lang,
	title,
	description,
	image,
	type = "website",
	authors,
	path,
	siteName,
}: MetadataProps): Metadata {
	const alternateLocale = lang === "en" ? "hr" : "en";
	const url = [websiteUrl, lang, path].filter(Boolean).join("/");

	return {
		alternates: {
			canonical: url,
			languages: {
				en: ["/en", path].filter(Boolean).join("/"),
				hr: ["/hr", path].filter(Boolean).join("/"),
			},
		},
		authors: authors ? authors.map((name) => ({ name })) : undefined,
		description,
		openGraph: {
			alternateLocale,
			authors,
			description,
			images: image ? [{ url: image }] : undefined,
			locale: lang,
			siteName,
			title: title,
			type,
			url,
		},
		title: path === "" ? { absolute: title } : title,
	};
}
