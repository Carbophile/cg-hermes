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
import { createMetadata } from "@lib/seo";
import { getAllProjects, getProjectBySlug } from "@projects/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Article, BreadcrumbList, WithContext } from "schema-dts";
import type { Pluggable } from "unified";
import JsonLd from "../../_components/JsonLd";

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

export const generateMetadata = async ({
	params,
}: ProjectPageProps): Promise<Metadata> => {
	const { lang, slug } = (await params) as { lang: Lang; slug: string };
	const dict = await getDict(lang);

	const project = await getProjectBySlug(lang, slug);

	if (!project) notFound();

	return createMetadata({
		description: project.meta.description,
		lang,
		path: `projects/${slug}`,
		siteName: dict.common.orgName,
		title: project.meta.title,
		type: "article",
	});
};

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

	const components = {
		// biome-ignore lint/suspicious/noExplicitAny: <Typing this would be unnecessary trouble. I trust the MDX parser to provide valid props>
		a: (props: any) => {
			if (props.href?.startsWith("http")) {
				return <a {...props} rel="noopener noreferrer" target="_blank" />;
			}
			return <Link {...props} />;
		},
	};

	const jsonLd: WithContext<Article> = {
		"@context": "https://schema.org",
		"@type": "Article",
		author: {
			"@type": "Organization",
			name: dict.common.orgName,
		},
		datePublished: new Date(project.meta.date).toISOString(),
		description: project.meta.description,
		headline: project.meta.title,
		url: `${websiteUrl}/${lang}/projects/${slug}`,
	};

	const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}`,
				name: dict.common.pages.home,
				position: 1,
			},
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}/projects`,
				name: dict.common.pages.projects,
				position: 2,
			},
			{
				"@type": "ListItem",
				item: `${websiteUrl}/${lang}/projects/${slug}`,
				name: project.meta.title,
				position: 3,
			},
		],
	};

	return (
		<article>
			<JsonLd data={[jsonLd, breadcrumbJsonLd]} />
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
							{dict.projects.status[project.meta.status]}
						</span>
					</div>
				</div>

				<div className="prose dark:prose-invert mx-auto">
					<MDXRemote
						components={components}
						options={options}
						source={project.content}
					/>
				</div>
			</section>
		</article>
	);
};

export default ProjectPage;
