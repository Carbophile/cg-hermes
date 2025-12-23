/*
 * Copyright 2025 Carbophile Group and Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getAllPosts } from "@blog/blog";
import { langs } from "@l10n/dict";
import { websiteUrl } from "@lib/constants";
import { getAllProjects } from "@projects/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

interface ContentItem {
	slug: string;
	meta: {
		date: string;
	};
}

const generateContentEntries = async <T extends ContentItem>(
	contentType: string,
	fetchItems: (lang: string) => Promise<T[]>,
	priority: number,
): Promise<MetadataRoute.Sitemap> => {
	const sitemapEntries: MetadataRoute.Sitemap = [];
	const allItemsBySlug = new Map<string, { [lang: string]: T }>();

	for (const lang of langs) {
		const items = await fetchItems(lang);
		for (const item of items) {
			let itemsForSlug = allItemsBySlug.get(item.slug);
			if (!itemsForSlug) {
				itemsForSlug = {};
				allItemsBySlug.set(item.slug, itemsForSlug);
			}
			itemsForSlug[lang] = item;
		}
	}

	for (const itemsByLang of allItemsBySlug.values()) {
		const alternates = {
			languages: Object.fromEntries(
				Object.entries(itemsByLang).map(([lang, item]) => [
					lang,
					`${websiteUrl}/${lang}/${contentType}/${item.slug}`,
				]),
			),
		};

		for (const [lang, item] of Object.entries(itemsByLang)) {
			sitemapEntries.push({
				alternates,
				changeFrequency: "yearly",
				lastModified: new Date(item.meta.date),
				priority,
				url: `${websiteUrl}/${lang}/${contentType}/${item.slug}`,
			});
		}
	}

	return sitemapEntries;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const sitemapEntries: MetadataRoute.Sitemap = [];

	// 1. Static pages
	const staticPages = ["", "blog", "projects", "contact", "collaborate"];
	for (const page of staticPages) {
		const alternates = {
			languages: Object.fromEntries(
				langs.map((lang) => [
					lang,
					page === ""
						? `${websiteUrl}/${lang}`
						: `${websiteUrl}/${lang}/${page}`,
				]),
			),
		};

		for (const lang of langs) {
			sitemapEntries.push({
				alternates,
				changeFrequency:
					page === "blog" || page === "projects" ? "weekly" : "monthly",
				priority: page === "" ? 1.0 : 0.25,
				url:
					page === ""
						? `${websiteUrl}/${lang}`
						: `${websiteUrl}/${lang}/${page}`,
			});
		}
	}

	// 2. Blog posts
	sitemapEntries.push(
		...(await generateContentEntries("blog", getAllPosts, 0.75)),
	);

	// 3. Projects
	sitemapEntries.push(
		...(await generateContentEntries("projects", getAllProjects, 0.5)),
	);

	return sitemapEntries;
};

export default sitemap;
