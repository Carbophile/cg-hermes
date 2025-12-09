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

import { getAllPosts, getPostBySlug } from "@blog/blog";
import { getDict, type Lang, langs } from "@l10n/dict";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Pluggable } from "unified";

export const generateStaticParams = async () => {
	const params: { lang: string; slug: string }[] = [];

	for (const lang of langs) {
		const posts = await getAllPosts(lang);
		for (const post of posts) {
			params.push({ lang, slug: post.slug });
		}
	}

	return params;
};

interface BlogPostPageProps {
	params: Promise<{ lang: string; slug: string }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { lang, slug } = (await params) as { lang: Lang; slug: string };
	const dict = await getDict(lang);

	const post = await getPostBySlug(lang, slug);

	if (!post) notFound();

	const options = {
		mdxOptions: {
			rehypePlugins: [
				[rehypePrettyCode, { theme: "github-dark" }] as Pluggable,
			],
		},
	};

	return (
		<article>
			<section className="mx-auto max-w-5xl px-4 py-12">
				<div className="mb-8 text-center">
					<h1 className="mb-2 font-bold text-3xl">{post.meta.title}</h1>
					<time className="text-gray-500">
						{new Date(post.meta.date).toLocaleDateString(lang, {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</time>
				</div>

				<div className="mb-8 flex items-center justify-center space-x-4">
					<Image
						alt={`${dict.headshot} ${post.meta.author.name}`}
						className="h-12 w-12 rounded-full"
						height="1"
						src={`/assets/headshots/${post.meta.author.photo}.webp`}
						width="1"
					/>
					<div>
						<p className="font-semibold">{post.meta.author.name}</p>
						<p className="text-gray-500">{post.meta.author.title}</p>
					</div>
				</div>

				<div className="prose dark:prose-invert mx-auto">
					<MDXRemote options={options} source={post.content} />
				</div>
			</section>
		</article>
	);
};

export default BlogPostPage;
