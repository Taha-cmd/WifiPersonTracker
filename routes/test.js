"use strict";
const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { join } = require("path");

const modulesPath = path.join(__dirname, "..", "modules");

const CsvParser = require(path.join(modulesPath, "CsvParser.js"));
const { randomFile } = require(path.join(modulesPath, "util.js"));

const testFilesPath = path.join(__dirname, "..", "test");

router.use("/*", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get("/read", (req, res) => {
	const text = fs.readFileSync(join(__dirname, "..", "test", "3.csv"), {
		encoding: "utf8",
	});
	res.header("Content-Type", "text/plain");
	res.send(text);
});

router.get("/:target?", (req, res) => {
	const parser = new CsvParser(randomFile(testFilesPath));
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
