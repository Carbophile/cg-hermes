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

import { getDict, type Lang } from "@l10n/dict";
import type { Metadata } from "next";
import Image from "next/image";

const websiteUrl = new URL("https://carbophile.org");

interface CollaboratePageProps {
	params: Promise<{ lang: string }>;
}

export const generateMetadata = async ({
	params,
}: CollaboratePageProps): Promise<Metadata> => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return {
		alternates: {
			canonical: "/en/collaborate",
			languages: {
				en: "/en/collaborate",
				hr: "/hr/collaborate",
			},
		},
		openGraph: {
			alternateLocale: lang === "en" ? "hr" : "en",
			description: `${dict.cybersecurity} ${dict.tagline}. ${dict.mission}`,
			locale: lang,
			siteName: dict.orgName,
			title: dict.pages.collaborate,
			type: "website",
			url: `${websiteUrl.toString()}/${lang}/collaborate`,
		},
		title: dict.pages.collaborate,
	};
};

const CollaboratePage = async ({ params }: CollaboratePageProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return (
		<article>
			<div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
				<Image
					alt=""
					className="absolute inset-0 -z-10 size-full object-cover opacity-10"
					height="9"
					role="presentation"
					src="/assets/PIX-classroom-stock.webp"
					width="16"
				/>
				<div
					aria-hidden="true"
					className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
				>
					<div
						className="aspect-1097/845 w-274.25 bg-linear-to-tr from-brand-primary to-brand-primary-light opacity-15 dark:opacity-20"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div
					aria-hidden="true"
					className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
				>
					<div
						className="aspect-1097/845 w-274.25 bg-linear-to-tr from-brand-primary to-brand-primary-light opacity-15 dark:opacity-20"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl">
					<h2 className="text-center font-semibold text-5xl text-gray-900 tracking-tight sm:text-7xl dark:text-white">
						{dict.pages.collaborate}
					</h2>
					<p className="mt-8 text-pretty text-justify font-medium text-gray-700 text-lg sm:text-xl/8 dark:text-gray-400">
						{dict.collaborate}
					</p>
				</div>
			</div>

			<div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
				<div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
					<div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
						<div className="flex p-px lg:col-span-4">
							<div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
								<Image
									alt=""
									className="h-80 w-full object-cover object-left"
									height="9"
									role="presentation"
									src="/assets/PIX-paperwork-stock.webp"
									width="16"
								/>
								<div className="p-10">
									<h3 className="font-semibold text-brand-primary text-sm/4">
										{dict.collaboratePage.researchers.group}
									</h3>
									<p className="mt-2 font-medium text-gray-900 text-lg tracking-tight dark:text-white">
										{dict.collaboratePage.researchers.subtitle}
									</p>
									<p className="mt-2 max-w-lg text-gray-600 text-sm/6 dark:text-gray-400">
										{dict.collaboratePage.researchers.body}
									</p>
								</div>
							</div>
						</div>
						<div className="flex p-px lg:col-span-2">
							<div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
								<Image
									alt=""
									className="h-80 w-full object-cover"
									height="9"
									role="presentation"
									src="/assets/PIX-children-stock.webp"
									width="16"
								/>
								<div className="p-10">
									<h3 className="font-semibold text-brand-primary text-sm/4">
										{dict.collaboratePage.k12.group}
									</h3>
									<p className="mt-2 font-medium text-gray-900 text-lg tracking-tight dark:text-white">
										{dict.collaboratePage.k12.subtitle}
									</p>
									<p className="mt-2 max-w-lg text-gray-600 text-sm/6 dark:text-gray-400">
										{dict.collaboratePage.k12.body}
									</p>
								</div>
							</div>
						</div>
						<div className="flex p-px lg:col-span-2">
							<div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
								<Image
									alt=""
									className="h-80 w-full object-cover"
									height="9"
									role="presentation"
									src="/assets/PIX-workshop-stock.webp"
									width="16"
								/>
								<div className="p-10">
									<h3 className="font-semibold text-brand-primary text-sm/4">
										{dict.collaboratePage.ngos.group}
									</h3>
									<p className="mt-2 font-medium text-gray-900 text-lg tracking-tight dark:text-white">
										{dict.collaboratePage.ngos.subtitle}
									</p>
									<p className="mt-2 max-w-lg text-gray-600 text-sm/6 dark:text-gray-400">
										{dict.collaboratePage.ngos.body}
									</p>
								</div>
							</div>
						</div>
						<div className="flex p-px lg:col-span-4">
							<div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
								<Image
									alt=""
									className="h-80 w-full object-cover object-left"
									height="9"
									role="presentation"
									src="/assets/PIX-conference-stock.webp"
									width="16"
								/>
								<div className="p-10">
									<h3 className="font-semibold text-brand-primary text-sm/4">
										{dict.collaboratePage.conferences.group}
									</h3>
									<p className="mt-2 font-medium text-gray-900 text-lg tracking-tight dark:text-white">
										{dict.collaboratePage.conferences.subtitle}
									</p>
									<p className="mt-2 max-w-lg text-gray-600 text-sm/6 dark:text-gray-400">
										{dict.collaboratePage.conferences.body}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-16 text-center">
						<p className="text-gray-600 text-lg dark:text-gray-400">
							{dict.collaboratePage.partner}
						</p>
						<a
							className="mt-4 inline-block font-medium text-brand-primary text-lg hover:text-brand-primary-light"
							href="mailto:partnership@carbophile.org"
						>
							{dict.collaboratePage.contact}
						</a>
					</div>
				</div>
			</div>
		</article>
	);
};

export default CollaboratePage;
