import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import zlib from "node:zlib";
import { resolvePath } from "./utils.js";

export const compress = async (command) => {
	const [, srcName, destName] = command.split(" ");

	const srcPath = resolvePath(srcName);
	const readStream = createReadStream(srcPath);

	const destPath = resolvePath(destName);
	const writeStream = createWriteStream(destPath);

	const zip = zlib.createGzip();

	pipeline(readStream, zip, writeStream, (err) => {
		if (err) {
			console.error("Operation failed");
		} else {
			console.log("File compressed");
		}
	});
};

export const decompress = async (command) => {
	const unzip = zlib.createUnzip();

	const [, srcName, destName] = command.split(" ");

	const srcPath = resolvePath(srcName);
	const readStream = createReadStream(srcPath);

	const destPath = resolvePath(destName);
	const writeStream = createWriteStream(destPath);

	pipeline(readStream, unzip, writeStream, (err) => {
		if (err) {
			console.error("Operation failed");
		} else {
			console.log("File decompressed");
		}
	});
};
