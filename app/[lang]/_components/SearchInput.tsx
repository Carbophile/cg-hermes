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

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}

export const SearchInput = ({
	value,
	onChange,
	placeholder,
}: SearchInputProps) => {
	return (
		<div className="mt-8">
			<input
				className="w-full rounded-md border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-brand-primary dark:bg-gray-800 dark:text-white"
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				type="text"
				value={value}
			/>
		</div>
	);
};
