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
	BuildingOffice2Icon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import { getDict, type Lang } from "@l10n/dict";
import type { Metadata } from "next";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

interface ContactPageProps {
	params: Promise<{ lang: string }>;
}

export const generateMetadata = async ({
	params,
}: ContactPageProps): Promise<Metadata> => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return {
		alternates: {
			canonical: "/en/contact",
			languages: {
				en: "/en/contact",
				hr: "/hr/contact",
			},
		},
		title: dict.pages.contact,
	};
};

const ContactPage = async ({ params }: ContactPageProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	const contactChannels = [
		{
			className: "lg:col-span-2",
			href: "mailto:info@carbophile.com",
			icon: EnvelopeIcon,
			name: dict.contact.email,
			value: "info@carbophile.com",
		},
		{
			className: "lg:col-span-2",
			href: "https://www.linkedin.com/company/103351222",
			icon: FaLinkedin,
			name: dict.contact.linkedin,
			value: "Carbophile Group",
		},
		{
			className: "lg:col-span-2",
			href: "tel:+385953556093",
			icon: PhoneIcon,
			name: dict.contact.phone,
			value: "+385 95 355 6093",
		},
		{
			className: "lg:col-span-6",
			href: "https://maps.app.goo.gl/P7JApLqqrTtxspgn9",
			icon: BuildingOffice2Icon,
			name: dict.contact.address,
			value: "Trg Hrvatske bratske zajednice 1, 21000 Split, HR",
		},
	];

	return (
		<div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
				<h2 className="font-semibold text-base/7 text-brand-primary">
					{dict.contact.prose}
				</h2>
				<p className="mt-2 max-w-lg text-pretty font-semibold text-4xl text-gray-950 tracking-tight sm:text-5xl dark:text-white">
					{dict.contact.heading}
				</p>
				<div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
					{contactChannels.map((channel) => (
						<Link
							className={`group relative ${channel.className}`}
							href={channel.href}
							key={channel.href}
							rel="noopener"
							target="_blank"
						>
							<div className="absolute inset-0 rounded-lg bg-white transition-colors group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-700" />
							<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] p-10">
								<channel.icon
									aria-hidden="true"
									className="h-12 w-12 flex-none text-neutral-400"
								/>
								<h3 className="mt-4 font-semibold text-brand-primary text-sm/4">
									{channel.name}
								</h3>
								<p className="mt-2 font-medium text-gray-950 text-lg tracking-tight dark:text-white">
									{channel.value}
								</p>
							</div>
							<div className="absolute inset-0 rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
