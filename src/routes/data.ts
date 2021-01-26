"use strict";

import express, { NextFunction, Request, Response, Router } from "express";
import { join } from "path";
import fs from "fs";
import { uuid } from "uuidv4";
import { UploadedFile } from "express-fileupload";

import { CsvParser } from "../modules/CsvParser";
import { cleanDir } from "../modules/util";
import { response } from "../interfaces/response";

const router: Router = express.Router();
let currentFile: string;
let timeOfScan: Date;

router.use("/*", (_: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get("/read", (_, res: Response) => {
	if (currentFile && fs.existsSync(currentFile)) {
		const text = fs.readFileSync(join(currentFile), { encoding: "utf8" });
		res.header("Content-Type", "text/plain");
		res.send(text);
	}
});

router.post("/", (req: Request, res: Response) => {
	if (!req.files) {
		return res.status(500).json({ msg: "error uploading file" });
	}

	if (!req.files.hasOwnProperty("data")) {
		return res.status(400).json({ msg: "no file identifier 'data' found" });
	}

	const file: UploadedFile = <UploadedFile>req.files.data;
	if (!file) {
		return res.status(400).json({ msg: "NO" });
	}

	if (!fs.existsSync("upload")) {
		fs.mkdirSync("upload");
	} else {
		cleanDir("upload");
	}

	const newPath: string = join("upload", uuid() + ".csv");

	file.mv(newPath, (err) => {
		if (err) {
			return res.status(500).json({ msg: "error saving the file" });
		}
	});

	currentFile = newPath;
	timeOfScan = new Date();
	res.json({ msg: "thanks" });
});

router.get("/:target?", (req: Request, res: Response) => {
	if (currentFile && fs.existsSync(currentFile)) {
		const parser: CsvParser = new CsvParser(currentFile, ",");
		const response: response = {
			msg: "here you go",
			timeOfScan: timeOfScan,
			data: { networks: [], clients: [] },
		};

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

export default router;
