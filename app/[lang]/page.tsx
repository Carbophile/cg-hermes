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

import { getAllPosts } from "@blog/blog";
import { getDict, type Lang } from "@l10n/dict";
import { createMetadata } from "@lib/seo";
import { getAllProjects } from "@projects/projects";
import type { Metadata } from "next";
import Faq from "./_page/Faq";
import Landing from "./_page/Landing";
import Stats from "./_page/Stats";

interface RootPageProps {
	params: Promise<{ lang: string }>;
}

export const generateMetadata = async ({
	params,
}: RootPageProps): Promise<Metadata> => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return createMetadata({
		description: `${dict.common.cybersecurity} ${dict.common.tagline}. ${dict.landing.mission}`,
		lang,
		path: "",
		siteName: dict.common.orgName,
		title: dict.common.orgName,
	});
};

const RootPage = async ({ params }: RootPageProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	const posts = await getAllPosts(lang);
	const projects = await getAllProjects(lang);

	return (
		<>
			<Landing dict={dict} lang={lang} />
			<Stats
				dict={dict}
				postCount={posts.length}
				projectCount={projects.length}
			/>
			<Faq dict={dict} />
		</>
	);
};

export default RootPage;
