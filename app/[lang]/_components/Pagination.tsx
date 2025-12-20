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

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	dict: Pick<Dictionary["common"], "next" | "previous">;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	dict,
}: PaginationProps) => {
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
		<nav className="mt-16 flex items-center justify-between border-gray-200 border-t px-4 sm:px-0 dark:border-white/10">
			<div className="-mt-px flex w-0 flex-1">
				<button
					className="inline-flex items-center border-transparent border-t-2 pt-4 pr-1 font-medium text-gray-500 text-sm hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
					disabled={currentPage === 1}
					onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
					type="button"
				>
					<ArrowLongLeftIcon
						aria-hidden="true"
						className="mr-3 size-5 text-gray-400 dark:text-gray-500"
					/>
					{dict.previous}
				</button>
			</div>
			<div className="hidden md:-mt-px md:flex">
				{getPageNumbers().map((item) =>
					typeof item.value === "number" ? (
						<button
							className={`inline-flex items-center border-t-2 px-4 pt-4 font-medium text-sm ${
								currentPage === item.value
									? "border-brand-primary text-brand-primary"
									: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20"
							}`}
							key={item.key}
							onClick={() => onPageChange(item.value as number)}
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
					onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
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
	);
};
