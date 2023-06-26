import os from "node:os";

export let dir = os.homedir();

export const setDir = (newDir) => {
	dir = newDir;
};
