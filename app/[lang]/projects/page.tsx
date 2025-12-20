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
import { createMetadata } from "@lib/seo";
import { getAllProjects } from "@projects/projects";
import type { Metadata } from "next";
import { ProjectList } from "./_components/ProjectList";

interface ProjectsPageProps {
	params: Promise<{ lang: string }>;
}

export const generateMetadata = async ({
	params,
}: ProjectsPageProps): Promise<Metadata> => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return createMetadata({
		description: `${dict.cybersecurity} ${dict.tagline}. ${dict.mission}`,
		lang,
		path: "projects",
		siteName: dict.orgName,
		title: dict.pages.projects,
	});
};

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	const projectsPageDict = {
		next: dict.next,
		previous: dict.previous,
		projectsPage: dict.projectsPage,
		search: dict.search,
	};

	const projects = await getAllProjects(lang);

	return (
		<div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-pretty font-semibold text-4xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
						{dict.pages.projects}
					</h2>
					<p className="mt-2 text-gray-600 text-lg/8 dark:text-gray-300">
						{dict.projectsPage.subtitle}
					</p>
				</div>
				<ProjectList dict={projectsPageDict} projects={projects} />
			</div>
		</div>
	);
};

export default ProjectsPage;
