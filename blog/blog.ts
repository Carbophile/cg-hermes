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
import type { Lang } from "@l10n/dict";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "blog/content");

const memoryCache = new Map();

interface PostFrontmatter {
	author: {
		name: string;
		photo: string;
		title: string;
	};
	date: string;
	description: string;
	thumbnail: string;
	title: string;
}

export interface BlogPost {
	slug: string;
	meta: PostFrontmatter;
	content: string;
}

const readPost = async (filePath: string): Promise<BlogPost | null> => {
	const slug = path.basename(filePath, path.extname(filePath));

	if (memoryCache.has(slug)) return memoryCache.get(slug);

	const fileContents = await fs.readFile(filePath, "utf-8");
	const { content, data } = matter(fileContents);

	const frontmatter = data as PostFrontmatter;

	const post = {
		content,
		meta: {
			author: frontmatter.author,
			date: frontmatter.date,
			description: frontmatter.description,
			thumbnail: frontmatter.thumbnail,
			title: frontmatter.title,
		},
		slug,
	};

	memoryCache.set(slug, post);

	return post;
};

export const getPostBySlug = async (
	lang: Lang,
	slug: string,
): Promise<BlogPost | null> => {
	const fullPath = path.join(postDirectory, lang, `${slug}.mdx`);
	return readPost(fullPath);
};

export const getAllPosts = async (lang: string): Promise<BlogPost[]> => {
	const dir = path.join(postDirectory, lang);

	const files = await fs.readdir(dir);

	const posts = await Promise.all(
		files
			.filter((file) => path.extname(file) === ".mdx")
			.map((file) => readPost(path.join(dir, file))),
	);

	return posts
		.filter((p): p is BlogPost => p !== null)
		.sort(
			(a, b) =>
				new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
		);
};
