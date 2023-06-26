import { up, cd, ls, cat, add, rn, cp, mv, rm } from "./fs.js";
import { hash } from "./hash.js";
import { compress, decompress } from "./zip.js";
import { handleOs } from "./os.js";

export const handlers = {
	up,
	cd,
	ls,
	cat,
	add,
	rn,
	cp,
	mv,
	rm,
	os: handleOs,
	hash,
	compress,
	decompress,
};
