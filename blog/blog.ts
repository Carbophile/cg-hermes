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

export type BlogPost = ContentItem<PostFrontmatter>;

const blogLoader = new ContentLoader<PostFrontmatter, PostFrontmatter>(
	"blog/content",
	(data) => data,
);

export const getPostBySlug = (lang: string, slug: string) =>
	blogLoader.getItemBySlug(lang, slug);

export const getAllPosts = (lang: string) => blogLoader.getAllItems(lang);
