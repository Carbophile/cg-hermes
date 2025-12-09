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

import type { Dictionary } from "@l10n/Dict";

const dictImports = {
	en: () => import("@l10n/dicts/dict.en.json"),
	hr: () => import("@l10n/dicts/dict.hr.json"),
} satisfies Record<string, () => Promise<{ default: Dictionary }>>;

export type Lang = keyof typeof dictImports;
export const langs = Object.keys(dictImports) as Lang[];

export const getDict = async (lang: Lang) => {
	const { default: dict } = await dictImports[lang]();
	return dict;
};
