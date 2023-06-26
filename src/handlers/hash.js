import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { resolvePath, exists } from "./utils.js";

const pipeAsync = promisify(pipeline);

export const hash = async (command) => {
	const fileName = command.split(" ")[1];
	const filePath = resolvePath(fileName);

	if (!(await exists(filePath))) {
		return console.error("File does not exist");
	}

	const hash = createHash("sha256").setEncoding("hex");
	const readStream = createReadStream(filePath);

	await pipeAsync(readStream, hash);

	console.log(hash.read());
};
