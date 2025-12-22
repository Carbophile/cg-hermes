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

"use client";

import type { BlogPost } from "@blog/blog";
import type { Dictionary } from "@l10n/Dict";
import type { Lang } from "@l10n/dict";
import { getAssetPath } from "@lib/assets";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Pagination } from "@/[lang]/_components/Pagination";
import { SearchInput } from "@/[lang]/_components/SearchInput";
import { useSearchAndPagination } from "@/[lang]/_hooks/useSearchAndPagination";

interface BlogListProps {
	dict: Pick<Dictionary["common"], "next" | "previous" | "search">;
	posts: BlogPost[];
}

export const BlogList = ({ dict, posts }: BlogListProps) => {
	const { lang } = useParams<{ lang: Lang }>();

	const {
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		totalPages,
		paginatedItems: paginatedPosts,
		filteredCount,
	} = useSearchAndPagination(
		posts,
		["meta.title", "meta.description", "meta.author.name"],
		5,
	);

	return (
		<>
			<SearchInput
				onChange={setSearchQuery}
				placeholder={dict.search}
				value={searchQuery}
			/>
			<div className="mt-16 space-y-20 lg:mt-20">
				{paginatedPosts.map((post: BlogPost, index: number) => (
					<article
						className="relative isolate flex flex-col gap-8 lg:flex-row"
						key={post.slug}
					>
						<div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
							<Image
								alt=""
								className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
								fill
								priority={index === 0}
								quality="75"
								role="presentation"
								sizes="(min-width: 1024px) 16rem, 100vw"
								src={getAssetPath(
									`blog-thumbnails/${post.meta.thumbnail}.webp`,
								)}
							/>
							<div className="absolute inset-0 inset-ring inset-ring-gray-900/10 rounded-2xl dark:inset-ring-white/10" />
						</div>
						<div>
							<div className="flex items-center gap-x-4 text-xs">
								<time
									className="text-gray-500 dark:text-gray-400"
									dateTime={post.meta.date}
								>
									{new Date(post.meta.date).toLocaleDateString(lang, {
										day: "numeric",
										month: "long",
										year: "numeric",
									})}
								</time>
							</div>
							<div className="group relative max-w-xl">
								<h3 className="mt-3 font-semibold text-gray-900 text-lg/6 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
									<Link href={`/${lang}/blog/${post.slug}`}>
										<span className="absolute inset-0" />
										{post.meta.title}
									</Link>
								</h3>
								<p className="mt-5 text-gray-600 text-sm/6 dark:text-gray-400">
									{post.meta.description}
								</p>
							</div>
							<div className="mt-6 flex border-gray-900/5 border-t pt-6 dark:border-white/10">
								<div className="relative flex items-center gap-x-4">
									<Image
										alt=""
										className="size-10 rounded-full bg-gray-50 dark:bg-gray-800"
										height="40"
										quality="75"
										role="presentation"
										src={getAssetPath(
											`headshots/${post.meta.author.photo}.webp`,
										)}
										width="40"
									/>
									<div className="text-sm/6">
										<p className="font-semibold text-gray-900 dark:text-white">
											{post.meta.author.name}
										</p>
										<p className="text-gray-600 dark:text-gray-400">
											{post.meta.author.title}
										</p>
									</div>
								</div>
							</div>
						</div>
					</article>
				))}
			</div>
			{filteredCount > 5 && (
				<Pagination
					currentPage={currentPage}
					dict={dict}
					onPageChange={setCurrentPage}
					totalPages={totalPages}
				/>
			)}
		</>
	);
};
