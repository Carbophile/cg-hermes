/*
 * Copyright 2025 Carbophile Group and Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * --------------------------------------------------------------------------
 *
 * THIRD-PARTY COMPONENT NOTICE
 *
 * This file contains proprietary user interface components provided by
 * Tailwind Labs Inc. (Tailwind Plus).
 *
 * Copyright 2025 Tailwind Labs Inc. All rights reserved.
 *
 * NOTICE: The Apache License 2.0 grant for this project DOES NOT apply to
 * the Tailwind Plus components contained within this file.
 *
 * These components are used under the Tailwind Plus License:
 *
 * 	https://tailwindcss.com/plus/license
 *
 * RESTRICTIONS:
 * You are granted the right to use, view, modify, and compile these
 * components solely as part of this project. You may not extract, modify,
 * or redistribute these components as standalone assets or for use in
 * other projects without a separate license from Tailwind Labs Inc.
 */

import { getAllPosts } from "@blog/blog";
import { getDict, type Lang } from "@l10n/dict";
import { websiteUrl } from "@lib/constants";
import { createMetadata } from "@lib/seo";
import type { Metadata } from "next";
import type { BreadcrumbList, WithContext } from "schema-dts";
import JsonLd from "../_components/JsonLd";
import { BlogList } from "./_components/BlogList";

interface BlogListPageProps {
	params: Promise<{ lang: string }>;
}

export const generateMetadata = async ({
	params,
}: BlogListPageProps): Promise<Metadata> => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return createMetadata({
		description: `${dict.common.cybersecurity} ${dict.common.tagline}. ${dict.landing.mission}`,
		lang,
		path: "blog",
		siteName: dict.common.orgName,
		title: dict.common.pages.blog,
	});
};

const BlogListPage = async ({ params }: BlogListPageProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	const blogListDict = {
		next: dict.common.next,
		previous: dict.common.previous,
		search: dict.common.search,
	};

	const posts = await getAllPosts(lang);

	const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}`,
				name: "Home",
				position: 1,
			},
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}/blog`,
				name: "Blog",
				position: 2,
			},
		],
	};

	return (
		<article className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<JsonLd data={breadcrumbJsonLd} />
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-4xl">
					<h2 className="text-pretty font-semibold text-4xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
						{dict.common.pages.blog}
					</h2>
					<p className="mt-2 text-gray-600 text-lg/8 dark:text-gray-400">
						{dict.blog.subtext}
					</p>
					<BlogList dict={blogListDict} posts={posts} />
				</div>
			</div>
		</article>
	);
};

export default BlogListPage;
