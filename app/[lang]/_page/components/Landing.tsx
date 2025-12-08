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
import type { Lang } from "@l10n/dict";
import Image from "next/image";

interface LandingProps {
	dict: Dictionary;
	lang: Lang;
}

const Landing = ({ dict, lang }: LandingProps) => {
	return (
		<div className="overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
					<div className="lg:pt-4 lg:pr-4">
						<div className="lg:max-w-lg">
							<p className="mt-2 text-pretty font-semibold text-4xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
								<span className="text-brand-primary">{dict.cybersecurity}</span>{" "}
								{dict.tagline}
							</p>
							<p className="mt-6 text-gray-700 text-lg/8 dark:text-gray-300">
								{dict.mission}
							</p>
							<div className="mt-8">
								<a
									className="inline-flex rounded-md bg-brand-primary px-3.5 py-2.5 font-semibold text-sm text-white shadow-xs hover:bg-brand-primary-light focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
									href={`/${lang}/blog`}
								>
									{dict.pages.blog}
								</a>
							</div>
							<figure className="mt-16 border-gray-200 border-l pl-8 text-gray-700 dark:border-gray-700 dark:text-gray-300">
								<blockquote className="text-base/7">
									<p>“{dict.foundingQuote}”</p>
								</blockquote>
								<figcaption className="mt-6 flex gap-x-4 text-sm/6">
									<Image
										alt=""
										className="size-6 flex-none rounded-full"
										height="1"
										src="/assets/headshots/borna-punda.webp"
										width="1"
									/>
									<div>
										<span className="font-semibold text-gray-900 dark:text-white">
											Borna Punda
										</span>{" "}
										—{" "}
										<span className="text-gray-600 dark:text-gray-400">
											{dict.cofounder}
										</span>
									</div>
								</figcaption>
							</figure>
						</div>
					</div>
					<video
						autoPlay
						className="md:-ml-4 w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 lg:ml-0 dark:ring-white/10"
						loop
						muted
						src="/assets/PIX-server-stock.webm"
					/>
				</div>
			</div>
		</div>
	);
};

export default Landing;
