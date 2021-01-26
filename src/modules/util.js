"use strict";

const fs = require("fs");
const path = require("path");

function randomFile(dirPath) {
	if(!fs.existsSync(dirPath))
		throw `path ${dirPath} does not exist`;

	const files = fs.readdirSync(dirPath).map((file) => path.join(dirPath, file));
	return files[Math.floor(Math.random() * files.length)];
}

function cleanDir(dirPath) {
	if(!fs.existsSync(dirPath))
		throw `path ${dirPath} does not exist`;

	fs.readdirSync(dirPath).forEach(file => fs.unlinkSync(path.join(dirPath, file)));
}

module.exports = { randomFile, cleanDir };
