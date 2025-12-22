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
import { getAssetPath } from "@lib/assets";
import { websiteUrl } from "@lib/constants";
import { getCloudflareImage } from "@lib/image-loader";
import { createMetadata } from "@lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { BlogPosting, BreadcrumbList, WithContext } from "schema-dts";
import type { Pluggable } from "unified";
import JsonLd from "../../_components/JsonLd";

export const generateStaticParams = async () => {
	const params = await Promise.all(
		langs.map(async (lang) => {
			const posts = await getAllPosts(lang);
			return posts.map((post) => ({ lang, slug: post.slug }));
		}),
	);

	return params.flat();
};

interface BlogPostPageProps {
	params: Promise<{ lang: string; slug: string }>;
}

export const generateMetadata = async ({
	params,
}: BlogPostPageProps): Promise<Metadata> => {
	const { lang, slug } = (await params) as { lang: Lang; slug: string };
	const dict = await getDict(lang);

	const post = await getPostBySlug(lang, slug);

	if (!post) notFound();

	return createMetadata({
		authors: [post.meta.author.name],
		description: post.meta.description,
		image: getCloudflareImage(
			getAssetPath(`blog-thumbnails/${post.meta.thumbnail}.webp`),
			{ width: 1200 },
		),
		lang,
		path: `blog/${slug}`,
		siteName: dict.common.orgName,
		title: post.meta.title,
		type: "article",
	});
};

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

	const components = {
		// biome-ignore lint/suspicious/noExplicitAny: <Typing this would be unnecessary trouble. I trust the MDX parser to provide valid props>
		a: (props: any) => {
			if (props.href?.startsWith("http")) {
				return <Link {...props} rel="noopener" target="_blank" />;
			}
			return <Link {...props} />;
		},
	};

	const jsonLd: WithContext<BlogPosting> = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		author: {
			"@type": "Person",
			image: `${websiteUrl}${getCloudflareImage(
				getAssetPath(`headshots/${post.meta.author.photo}.webp`),
				{ width: 400 },
			)}`,
			name: post.meta.author.name,
		},
		datePublished: new Date(post.meta.date).toISOString(),
		description: post.meta.description,
		headline: post.meta.title,
		image: `${websiteUrl}${getCloudflareImage(
			getAssetPath(`blog-thumbnails/${post.meta.thumbnail}.webp`),
			{ width: 1200 },
		)}`,
		url: `${websiteUrl}/${lang}/blog/${slug}`,
	};

	const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}`,
				name: dict.common.pages.home,
				position: 1,
			},
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}/blog`,
				name: dict.common.pages.blog,
				position: 2,
			},
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}/blog/${slug}`,
				name: post.meta.title,
				position: 3,
			},
		],
	};

	return (
		<article>
			<JsonLd data={[jsonLd, breadcrumbJsonLd]} />
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
						alt=""
						className="h-12 w-12 rounded-full"
						height="1"
						role="presentation"
						src={getAssetPath(`headshots/${post.meta.author.photo}.webp`)}
						width="1"
					/>
					<div>
						<p className="font-semibold">{post.meta.author.name}</p>
						<p className="text-gray-500">{post.meta.author.title}</p>
					</div>
				</div>

				<div className="prose dark:prose-invert mx-auto">
					<MDXRemote
						components={components}
						options={options}
						source={post.content}
					/>
				</div>
			</section>
		</article>
	);
};

export default BlogPostPage;
