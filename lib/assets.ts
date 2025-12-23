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

import manifest from "./assets-manifest.json";

// We can infer the valid keys from the manifest itself if we want strict typing. For now, we'll accept string to be more flexible, but we could improve this later.
export const getAssetPath = (path: string): string => {
	const key = path.startsWith("/") ? path.slice(1) : path;
	const cleanKey = key.replace(/^assets\//, "");

	const hashedPath = (manifest as Record<string, string>)[cleanKey];

	if (hashedPath) {
		return `/assets/${hashedPath}`;
	}

	console.warn(
		`Asset not found in manifest: ${cleanKey}. Run "pnpm run fingerprint".`,
	);
	return `/assets/${cleanKey}`;
};
