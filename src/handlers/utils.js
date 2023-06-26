import fs from "node:fs/promises";
import path from "node:path";
import { dir } from "../dir.js";

export const resolvePath = (str = "") => {
	if (path.isAbsolute(str)) {
		return str;
	} else {
		return path.join(dir, str);
	}
};

export const exists = async (path) => {
	try {
		await fs.access(path);
		return true;
	} catch {
		return false;
	}
};
