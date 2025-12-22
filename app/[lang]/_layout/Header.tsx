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

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Dictionary } from "@l10n/Dict";
import type { Lang } from "@l10n/dict";
import { getAssetPath } from "@lib/assets";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type HeaderDict = Pick<Dictionary, "common">;

interface HeaderProps {
	dict: HeaderDict;
}

const Header = ({ dict }: HeaderProps) => {
	const { lang } = useParams<{ lang: Lang }>();

	const pathName = usePathname();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navigation = useMemo(
		() => [
			{ href: `/${lang}/blog`, name: dict.common.pages?.blog },
			{ href: `/${lang}/projects`, name: dict.common.pages?.projects },
			{ href: `/${lang}/contact`, name: dict.common.pages?.contact },
			{ href: `/${lang}/collaborate`, name: dict.common.pages?.collaborate },
		],
		[
			lang,
			dict.common.pages?.blog,
			dict.common.pages?.projects,
			dict.common.pages?.contact,
			dict.common.pages?.collaborate,
		],
	);

	return (
		<header className="bg-white dark:bg-gray-900">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
			>
				<div className="flex flex-1">
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<Link
								className="font-semibold text-gray-900 text-sm/6 dark:text-white"
								href={item.href}
								key={item.name}
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="flex lg:hidden">
						<button
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400 dark:hover:text-white"
							onClick={() => setMobileMenuOpen(true)}
							type="button"
						>
							<span className="sr-only">{dict.common.menu.open}</span>
							<Bars3Icon aria-hidden="true" className="size-6" />
						</button>
					</div>
				</div>
				<Link className="-m-1.5 p-1.5" href={`/${lang}`}>
					<span className="sr-only">{dict.common.orgName}</span>
					<Image
						alt=""
						className="h-12 w-auto"
						height="1"
						src={getAssetPath("CG-brandmark.svg")}
						unoptimized
						width="1"
					/>{" "}
				</Link>
				<div className="flex flex-1 justify-end">
					<Link
						className="font-semibold text-gray-900 text-sm/6 dark:text-white"
						href={pathName.replace(
							`/${lang}`,
							`/${lang === "en" ? "hr" : "en"}`,
						)}
					>
						{dict.common.languageSwitch} <span aria-hidden="true">&rarr;</span>
					</Link>{" "}
					{/* Will have to be changed if we ever support more than 2 languages */}
				</div>
			</nav>
			<Dialog
				className="lg:hidden"
				onClose={setMobileMenuOpen}
				open={mobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900">
					<div className="flex items-center justify-between">
						<div className="flex flex-1">
							<button
								className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400 dark:hover:text-white"
								onClick={() => setMobileMenuOpen(false)}
								type="button"
							>
								<span className="sr-only">{dict.common.menu.close}</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>
						<Link className="-m-1.5 p-1.5" href={`/${lang}`}>
							<span className="sr-only">{dict.common.orgName}</span>
							<Image
								alt=""
								className="h-12 w-auto"
								height="1"
								src={getAssetPath("CG-brandmark.svg")}
								unoptimized
								width="1"
							/>{" "}
						</Link>
						<div className="flex flex-1 justify-end">
							<Link
								className="font-semibold text-gray-900 text-sm/6 dark:text-white"
								href={pathName.replace(
									`/${lang}`,
									`/${lang === "en" ? "hr" : "en"}`,
								)}
							>
								{dict.common.languageSwitch}{" "}
								<span aria-hidden="true">&rarr;</span>
							</Link>{" "}
							{/* Will have to be changed if we ever support more than 2 languages */}
						</div>
					</div>
					<div className="mt-6 space-y-2">
						{navigation.map((item) => (
							<Link
								className="-mx-3 block rounded-lg px-3 py-2 font-semibold text-base/7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
								href={item.href}
								key={item.name}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default Header;
