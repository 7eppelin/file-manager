import os from "node:os";

export const handleOs = async (command) => {
	const arg = command.split(" ")[1];

	if (arg === "--EOL") {
		console.log(JSON.stringify(os.EOL));
	} else if (arg === "--cpus") {
		console.log(os.cpus());
	} else if (arg === "--homedir") {
		console.log(os.homedir());
	} else if (arg === "--username") {
		console.log(os.userInfo().username);
	} else if (arg === "--architecture") {
		console.log(os.arch());
	} else {
		console.error("Invalid input");
	}
};
