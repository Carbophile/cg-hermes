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

import { Inter } from "next/font/google";
import Link from "next/link";

import "@/global.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	icons: {
		icon: "/assets/CG-brandmark.svg",
	},
	title: "Not Found | Carbophile Group",
};

const NotFound = () => (
	<main
		className={`fixed top-0 left-0 grid h-full w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 ${inter.className}`}
	>
		<div className="text-center">
			<p className="font-semibold text-base text-brand-primary">404</p>
			<h1 className="mt-4 text-balance font-semibold text-5xl text-gray-900 tracking-tight sm:text-7xl dark:text-white">
				Page not found
			</h1>
			<p className="mt-6 text-pretty font-medium text-gray-500 text-lg sm:text-xl/8 dark:text-gray-400">
				Sorry, we couldn’t find the page you’re looking for.
			</p>
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<Link
					className="rounded-md bg-brand-primary px-3.5 py-2.5 font-semibold text-sm text-white shadow-xs hover:bg-brand-primary-light focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
					href="/"
				>
					Return home
				</Link>
			</div>
		</div>
	</main>
);

export default NotFound;
