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

import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import type { Dictionary } from "@l10n/Dict";
import type { Lang } from "@l10n/dict";
import type { Project } from "@projects/projects";
import Fuse from "fuse.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ProjectListProps {
	projects: Project[];
	dict: Pick<Dictionary, "next" | "previous" | "projectsPage" | "search">;
}

export const ProjectList = ({ projects, dict }: ProjectListProps) => {
	const { lang } = useParams<{ lang: Lang }>();

	const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 6;

	const fuse = useMemo(
		() =>
			new Fuse(projects, {
				keys: ["meta.title", "meta.description", "meta.category"],
				threshold: 0.3,
			}),
		[projects],
	);

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredProjects(projects);
		} else {
			const results = fuse.search(searchQuery);
			setFilteredProjects(results.map((result) => result.item));
		}
		setCurrentPage(1);
	}, [searchQuery, fuse, projects]);

	const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
	const paginatedProjects = filteredProjects.slice(
		(currentPage - 1) * projectsPerPage,
		currentPage * projectsPerPage,
	);

	const getPageNumbers = () => {
		const pages: { key: string; value: number | string }[] = [];
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
			pages.push({ key: "page-1", value: 1 });
			if (startPage > 2) {
				pages.push({ key: "ellipsis-start", value: "..." });
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push({ key: `page-${i}`, value: i });
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push({ key: "ellipsis-end", value: "..." });
			}
			pages.push({ key: `page-${totalPages}`, value: totalPages });
		}

		return pages;
	};

	return (
		<>
			<div className="mt-8">
				<input
					className="w-full rounded-md border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-brand-primary dark:bg-gray-800 dark:text-white"
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder={dict.search}
					type="text"
					value={searchQuery}
				/>
			</div>

			<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-gray-700">
				{paginatedProjects.map((project) => (
					<article
						className="flex max-w-xl flex-col items-start justify-between"
						key={project.slug}
					>
						<div className="flex items-center gap-x-4 text-xs">
							<time
								className="text-gray-500 dark:text-gray-400"
								dateTime={project.meta.date}
							>
								{new Date(project.meta.date).toLocaleDateString(lang, {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
							</time>
							<span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
								{project.meta.category}
							</span>
							<span
								className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${
									project.meta.status === "ongoing"
										? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
										: "bg-gray-50 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400"
								}`}
							>
								{dict.projectsPage.status[project.meta.status]}
							</span>
						</div>
						<div className="group relative grow">
							<h3 className="mt-3 font-semibold text-gray-900 text-lg/6 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
								<Link href={`/${lang}/projects/${project.slug}`}>
									<span className="absolute inset-0" />
									{project.meta.title}
								</Link>
							</h3>
							<p className="mt-5 line-clamp-3 text-gray-600 text-sm/6 dark:text-gray-400">
								{project.meta.description}
							</p>
						</div>
					</article>
				))}
			</div>

			{filteredProjects.length > projectsPerPage && (
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
						{getPageNumbers().map((item) =>
							typeof item.value === "number" ? (
								<button
									className={`inline-flex items-center border-t-2 px-4 pt-4 font-medium text-sm ${
										currentPage === item.value
											? "border-brand-primary text-brand-primary"
											: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20"
									}`}
									key={item.key}
									onClick={() => setCurrentPage(item.value as number)}
									type="button"
								>
									{item.value}
								</button>
							) : (
								<span
									className="inline-flex items-center border-transparent border-t-2 px-4 pt-4 font-medium text-gray-500 text-sm"
									key={item.key}
								>
									{item.value}
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
			)}
		</>
	);
};
