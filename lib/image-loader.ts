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

export function getCloudflareImage(
	src: string,
	{ width, quality }: { width?: number; quality?: number } = {},
) {
	if (src.endsWith(".svg")) {
		return src;
	}
	const params = ["format=auto"];
	if (width) params.push(`width=${width}`);
	if (quality) params.push(`quality=${quality}`);
	return `/cdn-cgi/image/${params.join(",")}${src}`;
}

export default function cloudflareLoader({
	src,
	width,
	quality,
}: {
	src: string;
	width: number;
	quality?: number;
}) {
	return getCloudflareImage(src, { width, ...(quality ? { quality } : {}) });
}
