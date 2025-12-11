/*
 * Copyright 2025 Carbophile Group and Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from "node:fs/promises";
import path from "node:path";
import type { Lang } from "@l10n/dict";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "projects/content");

const memoryCache = new Map();

export type ProjectStatus = "ongoing" | "concluded";

export interface ProjectFrontmatter {
	title: string;
	description: string;
	date: string;
	status: ProjectStatus;
	category: string;
}

export interface Project {
	slug: string;
	meta: ProjectFrontmatter;
	content: string;
}

const readProject = async (filePath: string): Promise<Project | null> => {
	if (memoryCache.has(filePath)) return memoryCache.get(filePath);

	const slug = path.basename(filePath, path.extname(filePath));
	const fileContents = await fs.readFile(filePath, "utf-8");
	const { content, data } = matter(fileContents);

	const frontmatter = data as ProjectFrontmatter;

	const project = {
		content,
		meta: {
			category: frontmatter.category,
			date: frontmatter.date,
			description: frontmatter.description,
			status: frontmatter.status,
			title: frontmatter.title,
		},
		slug,
	};

	memoryCache.set(slug, project);

	return project;
};

export const getProjectBySlug = async (
	lang: Lang,
	slug: string,
): Promise<Project | null> => {
	const fullPath = path.join(projectsDirectory, lang, `${slug}.mdx`);
	return readProject(fullPath);
};

export const getAllProjects = async (lang: string): Promise<Project[]> => {
	const dir = path.join(projectsDirectory, lang);

	try {
		await fs.access(dir);
	} catch {
		return [];
	}

	const files = await fs.readdir(dir);

	const projects = await Promise.all(
		files
			.filter((file) => path.extname(file) === ".mdx")
			.map((file) => readProject(path.join(dir, file))),
	);

	return projects
		.filter((p): p is Project => p !== null)
		.sort(
			(a, b) =>
				new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
		);
};
