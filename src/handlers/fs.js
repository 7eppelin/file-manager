import path from "node:path";
import fs from "node:fs/promises";
import { exists, resolvePath } from "./utils.js";
import { dir, setDir } from "../dir.js";

export const up = () => {
	const arr = dir.split(path.sep);
	const newDir = arr.slice(0, arr.length - 1).join(path.sep);
	setDir(newDir);
};

export const cd = async (command) => {
	const dirName = command.split(" ")[1];
	const dirPath = resolvePath(dirName);

	if (await exists(dirPath)) {
		setDir(dirPath);
	} else {
		console.error("Operation failed");
	}
};

export const ls = async () => {
	const dirContents = await fs.readdir(dir);

	const promises = dirContents.map(async (name) => {
		const itemPath = path.join(dir, name);
		const stat = await fs.lstat(itemPath);
		const type = stat.isDirectory() ? "folder" : "file";

		return { name, type };
	});

	const result = await Promise.all(promises);

	result.sort((a, b) => {
		if (a.type === "folder" && b.type === "file") {
			return -1;
		}

		if (a.type === "file" && b.type === "folder") {
			return 1;
		}

		return a.name > b.name ? 1 : -1;
	});

	console.table(result);
};

export const cat = async (command) => {
	const fileName = command.split(" ")[1];
	const filePath = resolvePath(fileName);

	try {
		const contents = await fs.readFile(filePath, { encoding: "utf-8" });
		console.log(contents);
	} catch (err) {
		console.error("Operation failed");
	}
};

export const add = async (command) => {
	const fileName = command.split(" ")[1];
	const filePath = resolvePath(fileName);

	try {
		await fs.writeFile(filePath, "", { flag: "wx" });
	} catch {
		console.error("Operation failed");
	}
};

export const rn = async (command) => {
	const [, fileName, newName] = command.split(" ");
	const filePath = resolvePath(fileName);
	const newPath = resolvePath(newName);

	if (await exists(newPath)) {
		return console.error("Operation failed");
	}

	try {
		await fs.rename(filePath, newPath);
	} catch (err) {
		console.error("Operation failed");
	}
};

export const cp = async (command) => {
	const [, fileName, copyName] = command.split(" ");
	const filePath = resolvePath(fileName);
	const copyPath = resolvePath(copyName);

	try {
		await fs.cp(filePath, copyPath, {
			force: false,
			errorOnExist: true,
			recursive: true,
		});
	} catch (err) {
		console.error("Operation failed");
	}
};

export const mv = async (command) => {
	const [, fileName, destFolderName] = command.split(" ");
	const filePath = resolvePath(fileName);
	const destFolderPath = resolvePath(destFolderName);
	const destPath = path.join(destFolderPath, fileName);

	try {
		await fs.cp(filePath, destPath, {
			force: false,
			errorOnExist: true,
			recursive: true,
		});

		await fs.rm(filePath);
	} catch (err) {
		console.error(err);
		console.error("Operation failed");
	}
};

export const rm = async (command) => {
	const fileName = command.split(" ")[1];
	const filePath = resolvePath(fileName);

	try {
		await fs.rm(filePath);
	} catch (err) {
		console.error("Operation failed");
	}
};
