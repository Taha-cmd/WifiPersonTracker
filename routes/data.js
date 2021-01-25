"use strict";

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const modulesPath = path.join(__dirname, "..", "modules");

const CsvParser = require(path.join(modulesPath, "CsvParser.js"));
const { cleanDir } = require(path.join(modulesPath, "util.js"));

let currentFile;
let timeOfScan;

router.use("/*", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get("/read", (req, res) => {
	if (currentFile && fs.existsSync(currentFile)) {
		const text = fs.readFileSync(path.join(currentFile), { encoding: "utf8" });
		res.header("Content-Type", "text/plain");
		res.send(text);
	}
});

router.post("/", (req, res) => {
	if (!req.files) {
		return res.status(500).json({ msg: "error uploading file" });
	}

	if (!req.files.hasOwnProperty("data")) {
		return res.status(400).json({ msg: "no file identifier 'data' found" });
	}

	const file = req.files.data;
	if (!fs.existsSync("upload")) {
		fs.mkdirSync("upload");
	} else {
		cleanDir("upload");
	}

	const newPath = path.join(__dirname, "..", "upload", uuidv4() + ".csv");

	file.mv(newPath, (err) => {
		if (err) {
			return res.status(500).json({ msg: "error saving the file" });
		}
	});

	currentFile = newPath;
	timeOfScan = new Date();
	res.json({ msg: "thanks" });
});

router.get("/:target?", (req, res) => {
	if (currentFile && fs.existsSync(currentFile)) {
		const parser = new CsvParser(currentFile, ",");
		const response = { msg: "here you go", timeOfScan: timeOfScan, data: {} };

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

		return res.json(response);
	}

	res.json({ msg: "no data available" });
});

module.exports = router;
