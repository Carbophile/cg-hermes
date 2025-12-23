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

import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";

export const useSearchAndPagination = <T>(
	items: T[],
	searchKeys: string[],
	itemsPerPage: number,
) => {
	const [filteredItems, setFilteredItems] = useState<T[]>(items);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const searchKeysRef = useRef(searchKeys);

	if (
		searchKeys.length !== searchKeysRef.current.length ||
		!searchKeys.every((key, i) => key === searchKeysRef.current[i])
	) {
		searchKeysRef.current = searchKeys;
	}

	const fuse = useMemo(
		() =>
			new Fuse(items, {
				keys: searchKeysRef.current,
				threshold: 0.3,
			}),
		[items],
	);

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredItems(items);
		} else {
			const results = fuse.search(searchQuery);
			setFilteredItems(results.map((result) => result.item));
		}
		setCurrentPage(1);
	}, [searchQuery, items, fuse]);

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
	const paginatedItems = filteredItems.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return {
		currentPage,
		filteredCount: filteredItems.length,
		paginatedItems,
		searchQuery,
		setCurrentPage,
		setSearchQuery,
		totalPages,
	};
};
