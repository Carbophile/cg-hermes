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
import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import type { Dictionary } from "@l10n/Dict";
import type { Lang } from "@l10n/dict";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface BlogListProps {
	dict: Pick<Dictionary, "headshot" | "next" | "previous">;
	posts: BlogPost[];
}

export const BlogList = ({ dict, posts }: BlogListProps) => {
	const { lang } = useParams<{ lang: Lang }>();

	const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 5;

	const fuse = useMemo(
		() =>
			new Fuse(posts, {
				keys: ["meta.title", "meta.description", "meta.author.name"],
				threshold: 0.3,
			}),
		[posts],
	);

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredPosts(posts);
		} else {
			const results = fuse.search(searchQuery);
			setFilteredPosts(results.map((result) => result.item));
		}
		setCurrentPage(1);
	}, [searchQuery, posts, fuse]);

	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	const paginatedPosts = filteredPosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage,
	);

	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxPagesToShow = 5;
		const halfMaxPages = Math.floor(maxPagesToShow / 2);
		let startPage = Math.max(1, currentPage - halfMaxPages);
		let endPage = Math.min(totalPages, currentPage + halfMaxPages);

		if (currentPage - 1 <= halfMaxPages) {
			endPage = Math.min(totalPages, maxPagesToShow);
		}

		if (totalPages - currentPage <= halfMaxPages) {
			startPage = Math.max(1, totalPages - maxPagesToShow + 1);
		}

		if (startPage > 1) {
			pageNumbers.push(1);
			if (startPage > 2) {
				pageNumbers.push("...");
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pageNumbers.push("...");
			}
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	return (
		<>
			<div className="mt-8">
				<input
					className="w-full rounded-md border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-brand-primary dark:bg-gray-800 dark:text-white"
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search posts..."
					type="text"
					value={searchQuery}
				/>
			</div>
			<div className="mt-16 space-y-20 lg:mt-20">
				{paginatedPosts.map((post: BlogPost) => (
					<article
						className="relative isolate flex flex-col gap-8 lg:flex-row"
						key={post.slug}
					>
						<div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
							<Image
								alt=""
								aria-hidden="true"
								className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
								height="1"
								src={`/assets/blog-thumbnails/${post.meta.thumbnail}.webp`}
								width="1"
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
										alt={`${dict.headshot} ${post.meta.author.name}`}
										className="size-10 rounded-full bg-gray-50 dark:bg-gray-800"
										height="1"
										src={`/assets/headshots/${post.meta.author.photo}.webp`}
										width="1"
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
			<nav className="mt-16 flex items-center justify-between border-gray-200 border-t px-4 sm:px-0 dark:border-white/10">
				<div className="-mt-px flex w-0 flex-1">
					<button
						className="inline-flex items-center border-transparent border-t-2 pt-4 pr-1 font-medium text-gray-500 text-sm hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						type="button"
					>
						<ArrowLongLeftIcon
							aria-hidden="true"
							className="mr-3 size-5 text-gray-400 dark:text-gray-500"
						/>
						{dict.previous}
					</button>
				</div>
				<div className="md:-mt-px hidden md:flex">
					{getPageNumbers().map((page) =>
						typeof page === "number" ? (
							<button
								className={`inline-flex items-center border-t-2 px-4 pt-4 font-medium text-sm ${
									currentPage === page
										? "border-brand-primary text-brand-primary"
										: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20"
								}`}
								key={`page-${page}`}
								onClick={() => setCurrentPage(page)}
								type="button"
							>
								{page}
							</button>
						) : (
							<span
								className="inline-flex items-center border-transparent border-t-2 px-4 pt-4 font-medium text-gray-500 text-sm"
								key={`ellipsis-${page}`}
							>
								{page}
							</span>
						),
					)}
				</div>
				<div className="-mt-px flex w-0 flex-1 justify-end">
					<button
						className="inline-flex items-center border-transparent border-t-2 pt-4 pl-1 font-medium text-gray-500 text-sm hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
						disabled={currentPage === totalPages}
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						type="button"
					>
						{dict.next}
						<ArrowLongRightIcon
							aria-hidden="true"
							className="ml-3 size-5 text-gray-400 dark:text-gray-500"
						/>
					</button>
				</div>
			</nav>
		</>
	);
};
