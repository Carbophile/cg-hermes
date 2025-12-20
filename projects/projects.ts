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

import { type ContentItem, ContentLoader } from "@lib/content-loader";

export type ProjectStatus = "ongoing" | "concluded";

export interface ProjectFrontmatter {
	title: string;
	description: string;
	date: string;
	status: ProjectStatus;
	category: string;
}

export type Project = ContentItem<ProjectFrontmatter>;

const projectLoader = new ContentLoader<ProjectFrontmatter, ProjectFrontmatter>(
	"projects/content",
	(data) => data,
);

export const getProjectBySlug = (lang: string, slug: string) =>
	projectLoader.getItemBySlug(lang, slug);

export const getAllProjects = (lang: string) => projectLoader.getAllItems(lang);
