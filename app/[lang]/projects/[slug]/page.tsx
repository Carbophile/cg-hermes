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
import { getAllProjects, getProjectBySlug } from "@projects/projects";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Pluggable } from "unified";

export const generateStaticParams = async () => {
	const params = await Promise.all(
		langs.map(async (lang) => {
			const projects = await getAllProjects(lang);
			return projects.map((project) => ({ lang, slug: project.slug }));
		}),
	);

	return params.flat();
};

interface ProjectPageProps {
	params: Promise<{ lang: string; slug: string }>;
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
	const { lang, slug } = (await params) as { lang: Lang; slug: string };
	const dict = await getDict(lang);

	const project = await getProjectBySlug(lang, slug);

	if (!project) notFound();

	const options = {
		mdxOptions: {
			rehypePlugins: [
				[rehypePrettyCode, { theme: "github-dark" }] as Pluggable,
			],
		},
	};

	return (
		<article>
			<section className="mx-auto max-w-5xl px-4 py-12">
				<div className="mb-8 text-center">
					<h1 className="mb-4 font-bold text-3xl">{project.meta.title}</h1>
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm">
						<time className="text-gray-500 dark:text-gray-400">
							{new Date(project.meta.date).toLocaleDateString(lang, {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</time>
						<span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
							{project.meta.category}
						</span>
						<span
							className={`rounded-full px-3 py-1 font-medium ${
								project.meta.status === "ongoing"
									? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
									: "bg-gray-50 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400"
							}`}
						>
							{dict.projectsPage.status[project.meta.status]}
						</span>
					</div>
				</div>

				<div className="prose dark:prose-invert mx-auto">
					<MDXRemote options={options} source={project.content} />
				</div>
			</section>
		</article>
	);
};

export default ProjectPage;
