"use strict";

const fs = require("fs");
const path = require("path");

function randomFile(dirPath) {
	const files = fs.readdirSync(dirPath).map((file) => path.join(dirPath, file));
	return files[Math.floor(Math.random() * files.length)];
}

module.exports = { randomFile };
