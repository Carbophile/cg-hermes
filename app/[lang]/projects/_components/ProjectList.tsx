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

import type { Dictionary } from "@l10n/Dict";
import type { Lang } from "@l10n/dict";
import type { Project } from "@projects/projects";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Pagination } from "@/[lang]/_components/Pagination";
import { SearchInput } from "@/[lang]/_components/SearchInput";
import { useSearchAndPagination } from "@/[lang]/_hooks/useSearchAndPagination";

interface ProjectListProps {
	projects: Project[];
	dict: Pick<
		Dictionary["common"] & { projectsPage: Dictionary["projects"] },
		"next" | "previous" | "projectsPage" | "search"
	>;
}

export const ProjectList = ({ projects, dict }: ProjectListProps) => {
	const { lang } = useParams<{ lang: Lang }>();

	const {
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		totalPages,
		paginatedItems: paginatedProjects,
		filteredCount,
	} = useSearchAndPagination(
		projects,
		["meta.title", "meta.description", "meta.category"],
		6,
	);

	return (
		<>
			<SearchInput
				onChange={setSearchQuery}
				placeholder={dict.search}
				value={searchQuery}
			/>

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

			{filteredCount > 6 && (
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
