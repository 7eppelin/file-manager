import { handlers } from "./handlers/index.js";
import { dir } from "./dir.js";

const fileManager = async () => {
	const username = process.argv[2].split("=")[1];

	console.log(`Welcome to the File Manager, ${username}!`);
	console.log(dir);

	process.stdin.on("data", async (chunk) => {
		const command = chunk.toString().trim();
		const operation = command.split(" ")[0];
		const handler = handlers[operation];

		if (!handler) {
			return console.error("Invalid input");
		}

		await handler(command);

		console.log(dir);
	});

	process.on("SIGINT", () => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		process.exit();
	});
};

fileManager();
