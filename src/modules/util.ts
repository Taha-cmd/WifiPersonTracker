"use strict";

import { readdirSync, existsSync, unlinkSync } from "fs";
import { join } from "path";

export function randomFile(dirPath: string): string {
	if (!existsSync(dirPath)) throw `path ${dirPath} does not exist`;

	const files = readdirSync(dirPath).map((file: string) => join(dirPath, file));

	if (files.length === 0) throw `directory ${dirPath} is empty`;

	return <string>files[Math.floor(Math.random() * files.length)];
}

export function cleanDir(dirPath: string): void {
	if (!existsSync(dirPath)) throw `path ${dirPath} does not exist`;

	readdirSync(dirPath).forEach((file: string) =>
		unlinkSync(join(dirPath, file))
	);
}
