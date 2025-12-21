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

import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { Dictionary } from "@l10n/Dict";

interface FaqProps {
	dict: Dictionary;
}

const Faq = ({ dict }: FaqProps) => {
	const faqs = [
		{
			answer: dict.landing.faq.faqs.projects.answer,
			question: dict.landing.faq.faqs.projects.question,
		},
		{
			answer: dict.landing.faq.faqs.differCommercial.answer,
			question: dict.landing.faq.faqs.differCommercial.question,
		},
		{
			answer: dict.landing.faq.faqs.nonprofit.answer,
			question: dict.landing.faq.faqs.nonprofit.question,
		},
		{
			answer: dict.landing.faq.faqs.consulting.answer,
			question: dict.landing.faq.faqs.consulting.question,
		},
	];

	return (
		<div className="bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div className="mx-auto max-w-4xl">
					<h2 className="font-semibold text-4xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
						{dict.landing.faq.heading}
					</h2>
					<dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
						{faqs.map((faq) => (
							<Disclosure
								as="div"
								className="py-6 first:pt-0 last:pb-0"
								key={faq.question}
							>
								<dt>
									<DisclosureButton className="group flex w-full cursor-pointer items-start justify-between text-left text-gray-900 dark:text-white">
										<span className="font-semibold text-base/7">
											{faq.question}
										</span>
										<span className="ml-6 flex h-7 items-center">
											<PlusIcon
												aria-hidden="true"
												className="size-6 group-data-open:hidden"
											/>
											<MinusIcon
												aria-hidden="true"
												className="size-6 group-not-data-open:hidden"
											/>
										</span>
									</DisclosureButton>
								</dt>
								<DisclosurePanel as="dd" className="mt-2 pr-12">
									<p className="text-base/7 text-gray-600 dark:text-gray-400">
										{faq.answer}
									</p>
								</DisclosurePanel>
							</Disclosure>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

export default Faq;
