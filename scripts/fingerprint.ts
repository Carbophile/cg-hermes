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

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SOURCE_DIR = path.join(process.cwd(), "assets");
const TARGET_DIR = path.join(process.cwd(), "public", "assets");
const MANIFEST_PATH = path.join(process.cwd(), "lib", "assets-manifest.json");

function cleanDirectory(dir: string) {
	if (fs.existsSync(dir)) {
		fs.rmSync(dir, { force: true, recursive: true });
	}
}

function ensureDirectoryExistence(filePath: string) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function getFiles(dir: string): string[] {
	let files: string[] = [];
	if (!fs.existsSync(dir)) return files;

	const items = fs.readdirSync(dir, { withFileTypes: true });
	for (const item of items) {
		const fullPath = path.join(dir, item.name);
		if (item.isDirectory()) {
			files = [...files, ...getFiles(fullPath)];
		} else {
			files.push(fullPath);
		}
	}
	return files;
}

function fingerprint() {
	console.log("Fingerprinting assets...");

	cleanDirectory(TARGET_DIR);

	const manifest: Record<string, string> = {};
	const files = getFiles(SOURCE_DIR);

	for (const file of files) {
		const content = fs.readFileSync(file);
		const hash = crypto
			.createHash("sha256")
			.update(content)
			.digest("hex")
			.substring(0, 8);

		const relativePath = path.relative(SOURCE_DIR, file);
		const ext = path.extname(relativePath);
		const basename = path.basename(relativePath, ext);
		const dirname = path.dirname(relativePath);

		const hashedName = `${basename}.${hash}${ext}`;
		const hashedRelativePath = path.join(dirname, hashedName);

		const targetPath = path.join(TARGET_DIR, hashedRelativePath);

		ensureDirectoryExistence(targetPath);
		fs.copyFileSync(file, targetPath);

		const manifestKey = relativePath.split(path.sep).join("/");
		manifest[manifestKey] = hashedRelativePath.split(path.sep).join("/");
	}

	fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
	console.log(
		`Processed ${files.length} assets. Manifest written to ${MANIFEST_PATH}`,
	);
}

fingerprint();
