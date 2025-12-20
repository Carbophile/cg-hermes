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

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface BaseMeta {
	date: string;
	title: string;
}

export interface ContentItem<T extends BaseMeta> {
	slug: string;
	meta: T;
	content: string;
}

export const sortByDate = <T extends BaseMeta>(
	a: ContentItem<T>,
	b: ContentItem<T>,
) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();

export class ContentLoader<Frontmatter, Meta extends BaseMeta> {
	private cache = new Map<string, ContentItem<Meta>>();
	private readonly baseDir: string;
	private readonly mapFrontmatter: (data: Frontmatter) => Meta;

	constructor(
		directoryPath: string,
		mapFrontmatter: (data: Frontmatter) => Meta,
	) {
		this.baseDir = path.join(process.cwd(), directoryPath);
		this.mapFrontmatter = mapFrontmatter;
	}

	async getItemBySlug(
		lang: string,
		slug: string,
	): Promise<ContentItem<Meta> | null> {
		const filePath = path.join(this.baseDir, lang, `${slug}.mdx`);

		const cached = this.cache.get(filePath);
		if (cached) {
			return cached;
		}

		const fileContents = await fs.readFile(filePath, "utf-8");
		const { content, data } = matter(fileContents);

		const item: ContentItem<Meta> = {
			content,
			meta: this.mapFrontmatter(data as Frontmatter),
			slug,
		};

		this.cache.set(filePath, item);
		return item;
	}

	async getAllItems(lang: string): Promise<ContentItem<Meta>[]> {
		const dir = path.join(this.baseDir, lang);

		try {
			await fs.access(dir);
		} catch {
			return [];
		}

		const files = await fs.readdir(dir);

		const items = await Promise.all(
			files
				.filter((file) => path.extname(file) === ".mdx")
				.map((file) => {
					const slug = path.basename(file, path.extname(file));
					return this.getItemBySlug(lang, slug);
				}),
		);

		return items
			.filter((item): item is ContentItem<Meta> => item !== null)
			.sort(sortByDate);
	}
}
