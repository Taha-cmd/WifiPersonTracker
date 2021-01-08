"use strict";

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const CsvParser = require(path.join(
	__dirname,
	"..",
	"modules",
	"CsvParser.js"
));

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
}; // retrieve a random element from the array

const testFilesPath = path.join(__dirname, "..", "test");

const testFiles = fs
	.readdirSync(testFilesPath)
	.map((file) => path.join(testFilesPath, file));

router.get("/:target?", (req, res) => {
	const parser = new CsvParser(testFiles.random());
	const response = { msg: "here you go", timeOfScan: new Date(), data: {} };

	if (!req.params.target || req.params.target === "all") {
		response.data.networks = parser.getNetworks();
		response.data.clients = parser.getClients();
	} else if (req.params.target === "clients") {
		response.data.clients = parser.getClients();
	} else if (req.params.target === "networks") {
		response.data.networks = parser.getNetworks();
	} else {
		return res
			.status(404)
			.json({ msg: `target ${req.params.target} Not Found` });
	}

	res.json(response);
});

module.exports = router;
