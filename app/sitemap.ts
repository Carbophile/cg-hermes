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

import { type BlogPost, getAllPosts } from "@blog/blog";
import { langs } from "@l10n/dict";
import { websiteUrl } from "@lib/constants";
import { getAllProjects, type Project } from "@projects/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
	const allPostsBySlug = new Map<string, { [lang: string]: BlogPost }>();
	for (const lang of langs) {
		const posts = await getAllPosts(lang);
		for (const post of posts) {
			let postsForSlug = allPostsBySlug.get(post.slug);
			if (!postsForSlug) {
				postsForSlug = {};
				allPostsBySlug.set(post.slug, postsForSlug);
			}
			postsForSlug[lang] = post;
		}
	}

	for (const postsByLang of allPostsBySlug.values()) {
		const alternates = {
			languages: Object.fromEntries(
				Object.entries(postsByLang).map(([lang, post]) => [
					lang,
					`${websiteUrl}/${lang}/blog/${post.slug}`,
				]),
			),
		};

		for (const [lang, post] of Object.entries(postsByLang)) {
			sitemapEntries.push({
				alternates,
				changeFrequency: "yearly",
				lastModified: new Date(post.meta.date),
				priority: 0.75,
				url: `${websiteUrl}/${lang}/blog/${post.slug}`,
			});
		}
	}

	// 3. Projects
	const allProjectsBySlug = new Map<string, { [lang: string]: Project }>();
	for (const lang of langs) {
		const projects = await getAllProjects(lang);
		for (const project of projects) {
			let projectsForSlug = allProjectsBySlug.get(project.slug);
			if (!projectsForSlug) {
				projectsForSlug = {};
				allProjectsBySlug.set(project.slug, projectsForSlug);
			}
			projectsForSlug[lang] = project;
		}
	}

	for (const projectsByLang of allProjectsBySlug.values()) {
		const alternates = {
			languages: Object.fromEntries(
				Object.entries(projectsByLang).map(([lang, project]) => [
					lang,
					`${websiteUrl}/${lang}/projects/${project.slug}`,
				]),
			),
		};

		for (const [lang, project] of Object.entries(projectsByLang)) {
			sitemapEntries.push({
				alternates,
				changeFrequency: "yearly",
				lastModified: new Date(project.meta.date),
				priority: 0.5,
				url: `${websiteUrl}/${lang}/projects/${project.slug}`,
			});
		}
	}

	return sitemapEntries;
}
