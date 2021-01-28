"use strict";

import express, { Request, Response, Router } from "express";
import { join } from "path";
import fs from "fs";
import { uuid } from "uuidv4";
import { UploadedFile } from "express-fileupload";

import { parseAiroDumpFile } from "../modules/CsvParser";
import { cleanDir } from "../modules/util";

import { IResponse } from "../interfaces/IResponse";
import { IParsedAiroDumpFile } from "../interfaces/IParsedAiroDumpFile";

const router: Router = express.Router();
let currentFile: string;
let timeOfScan: Date;

router.get("/read", (_, res: Response) => {
	if (!(currentFile && fs.existsSync(currentFile))) {
		return res.json({ msg: "no data available" });
	}

	const text: string = fs.readFileSync(join(currentFile), { encoding: "utf8" });
	res.header("Content-Type", "text/plain");
	res.send(text);
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
	if (!(currentFile && fs.existsSync(currentFile))) {
		return res.json({ msg: "no data available" });
	}
	const response: IResponse = {
		msg: "here you go",
		timeOfScan: timeOfScan,
		data: { networks: [], clients: [] },
	};

	const parsedFile: IParsedAiroDumpFile = parseAiroDumpFile(currentFile);

	if (!req.params.target || req.params.target === "all") {
		[response.data.networks, response.data.clients] = [
			parsedFile.networks,
			parsedFile.clients,
		];
	} else if (req.params.target === "clients") {
		response.data.clients = parsedFile.clients;
	} else if (req.params.target === "networks") {
		response.data.networks = parsedFile.networks;
	} else {
		return res
			.status(404)
			.json({ msg: `target ${req.params.target} Not Found` });
	}

	res.json(response);
});

export default router;
