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

import { getDict, type Lang, langs } from "@l10n/dict";
import { websiteUrl } from "@lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "./_layout/Footer";
import Header from "./_layout/Header";

import "@/global.css";

const inter = Inter({ subsets: ["latin"] });

export const generateStaticParams = () => langs.map((lang) => ({ lang }));

interface RootLayoutProps {
	params: Promise<{ lang: string }>;
	children: ReactNode;
}

export const generateMetadata = async ({
	params,
}: RootLayoutProps): Promise<Metadata> => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return {
		description: `${dict.common.cybersecurity} ${dict.common.tagline}. ${dict.landing.mission}`,
		icons: {
			icon: "/assets/CG-brandmark.svg",
		},
		metadataBase: new URL(websiteUrl),
		title: {
			default: dict.common.orgName,
			template: `%s | ${dict.common.orgName}`,
		},
	};
};

const RootLayout = async ({ params, children }: RootLayoutProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	const headerDict = {
		common: dict.common,
	};

	return (
		<html
			className={`scheme-light dark:scheme-dark bg-white dark:bg-gray-900 ${inter.className}`}
			lang={lang}
		>
			<body className="flex min-h-screen flex-col">
				<Header dict={headerDict} />
				<main className="grow">{children}</main>
				<Footer dict={dict} />
			</body>
		</html>
	);
};

export default RootLayout;
