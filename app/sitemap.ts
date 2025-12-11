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
import { getAllProjects, type Project } from "@projects/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://carbophile.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapEntries: MetadataRoute.Sitemap = [];

	// 1. Static pages
	const staticPages = ["", "blog", "projects", "contact", "collaborate"];
	for (const page of staticPages) {
		const alternates = {
			languages: Object.fromEntries(
				langs.map((lang) => [
					lang,
					page === "" ? `${baseUrl}/${lang}` : `${baseUrl}/${lang}/${page}`,
				]),
			),
		};

		sitemapEntries.push({
			alternates,
			changeFrequency:
				page === "blog" || page === "projects" ? "weekly" : "monthly",
			priority: page === "" ? 1.0 : 0.25,
			url: page === "" ? `${baseUrl}/en` : `${baseUrl}/en/${page}`,
		});
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
					`${baseUrl}/${lang}/blog/${post.slug}`,
				]),
			),
		};

		const primaryLang = "en";
		let primaryPost = postsByLang[primaryLang];
		let primaryPostLang = primaryLang;

		if (!primaryPost) {
			const firstLang = Object.keys(postsByLang)[0];
			if (firstLang) {
				primaryPostLang = firstLang;
				primaryPost = postsByLang[firstLang];
			}
		}

		if (primaryPost) {
			sitemapEntries.push({
				alternates,
				changeFrequency: "yearly",
				lastModified: new Date(primaryPost.meta.date),
				priority: 0.75,
				url: `${baseUrl}/${primaryPostLang}/blog/${primaryPost.slug}`,
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
					`${baseUrl}/${lang}/projects/${project.slug}`,
				]),
			),
		};

		const primaryLang = "en";
		let primaryProject = projectsByLang[primaryLang];
		let primaryProjectLang = primaryLang;

		if (!primaryProject) {
			const firstLang = Object.keys(projectsByLang)[0];
			if (firstLang) {
				primaryProjectLang = firstLang;
				primaryProject = projectsByLang[firstLang];
			}
		}

		if (primaryProject) {
			sitemapEntries.push({
				alternates,
				changeFrequency: "yearly",
				lastModified: new Date(primaryProject.meta.date),
				priority: 0.5,
				url: `${baseUrl}/${primaryProjectLang}/projects/${primaryProject.slug}`,
			});
		}
	}

	return sitemapEntries;
}
