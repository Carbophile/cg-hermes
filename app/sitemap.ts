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
import { getAllProjects } from "@projects/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://carbophile.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapEntries: MetadataRoute.Sitemap = [];

	for (const lang of langs) {
		const staticPages = ["", "blog", "projects", "contact", "collaborate"];

		for (const page of staticPages) {
			const url =
				page === "" ? `${baseUrl}/${lang}` : `${baseUrl}/${lang}/${page}`;

			sitemapEntries.push({
				changeFrequency:
					page === "blog" || page === "projects" ? "weekly" : "monthly",
				priority: page === "" ? 1.0 : 0.25,
				url,
			});
		}

		const posts = await getAllPosts(lang);
		for (const post of posts) {
			sitemapEntries.push({
				changeFrequency: "yearly",
				lastModified: new Date(post.meta.date),
				priority: 0.75,
				url: `${baseUrl}/${lang}/blog/${post.slug}`,
			});
		}

		const projects = await getAllProjects(lang);
		for (const project of projects) {
			sitemapEntries.push({
				changeFrequency: "yearly",
				lastModified: new Date(project.meta.date),
				priority: 0.5,
				url: `${baseUrl}/${lang}/projects/${project.slug}`,
			});
		}
	}

	return sitemapEntries;
}
