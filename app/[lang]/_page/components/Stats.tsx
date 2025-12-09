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

import type { Dictionary } from "@l10n/Dict";

interface StatsProps {
	dict: Dictionary;
}

const Stats = ({ dict }: StatsProps) => {
	const stats = [
		{ id: 1, name: dict.stats?.members, value: "4" },
		{ id: 2, name: dict.stats?.projects, value: "2" },
		{ id: 3, name: dict.stats?.presentations, value: "0" },
		{ id: 4, name: dict.stats?.vulnerabilities, value: "0" },
	];

	return (
		<article className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="text-center">
						<h2 className="text-balance font-semibold text-4xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
							{dict.stats?.heading}
						</h2>
					</div>
					<dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
						{stats.map((stat) => (
							<div
								className="flex flex-col bg-gray-400/5 p-8 dark:bg-white/5"
								key={stat.id}
							>
								<dt className="font-semibold text-gray-600 text-sm/6 dark:text-gray-300">
									{stat.name}
								</dt>
								<dd className="order-first font-semibold text-3xl text-gray-900 tracking-tight dark:text-white">
									{stat.value}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</article>
	);
};

export default Stats;
