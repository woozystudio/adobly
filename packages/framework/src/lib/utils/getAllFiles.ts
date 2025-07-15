import fs from "fs";
import path from "path";

export function getAllFiles(dirPath: string, foldersOnly = false): string[] {
	let fileNames: string[] = [];

	const files = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const file of files) {
		const filePath = path.join(dirPath, file.name);

		if (foldersOnly && file.isDirectory()) {
			fileNames.push(filePath);
		} else if (file.isFile()) {
			fileNames.push(filePath);
		}
	}

	return fileNames;
}
