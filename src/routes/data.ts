"use strict";

import express, { Request, Response, Router } from "express";
import path, { join, resolve } from "path";
import fs from "fs";
import { uuid } from "uuidv4";
import { UploadedFile } from "express-fileupload";

import { parseAiroDumpFile } from "../modules/CsvParser";
import { cleanDir } from "../modules/util";
import { maskMacAddresses } from "../modules/PrivacyManager";

import { IResponse } from "../interfaces/IResponse";
import { IParsedAiroDumpFile } from "../interfaces/IParsedAiroDumpFile";

const router: Router = express.Router();
let currentFilePath: string;
let currentFileParsed: IParsedAiroDumpFile;
let timeOfScan: Date;

const uploadPath = resolve("upload");

router.get("/read", (_, res: Response) => {
	if (!(currentFilePath && fs.existsSync(currentFilePath))) {
		return res.json({ msg: "no data available" });
	}

	const text: string = fs.readFileSync(currentFilePath, {
		encoding: "utf8"
	});
	res.header("Content-Type", "text/plain");
	res.send(text);
});

router.post("/", async (req: Request, res: Response) => {
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

	try {
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		} else {
			cleanDir(uploadPath);
		}
	} catch (error) {
		console.log("error cleaning directory" + error);
	}

	const newPath: string = path.resolve(uploadPath, uuid() + ".csv");

	// mv is async, need to wait for the file to be uploaded before it can be parsed
	// not using the async version can cause problems, since you might try to parse the file
	//before it was actually uploaded
	await file
		.mv(newPath)
		.catch((error) =>
			res.status(500).json({ msg: "error saving the file " + error })
		);

	// new path is relative, currentFile must be absolute
	currentFilePath = path.resolve(newPath);
	currentFileParsed = parseAiroDumpFile(currentFilePath);
	try {
		currentFileParsed.clients = maskMacAddresses(currentFileParsed.clients);
	} catch (error) {
		console.log("error parsing file: " + error);
	}

	timeOfScan = new Date();
	res.json({ msg: "thanks" });
});

router.get("/:target?", (req: Request, res: Response) => {
	if (
		!(currentFilePath && fs.existsSync(currentFilePath)) ||
		!currentFileParsed
	) {
		return res.json({ msg: "no data available" });
	}

	const response: IResponse = {
		msg: "here you go",
		timeOfScan: timeOfScan,
		data: { networks: [], clients: [] }
	};

	if (!req.params.target || req.params.target === "all") {
		[response.data.networks, response.data.clients] = [
			currentFileParsed.networks,
			currentFileParsed.clients
		];
	} else if (req.params.target === "clients") {
		response.data.clients = currentFileParsed.clients;
	} else if (req.params.target === "networks") {
		response.data.networks = currentFileParsed.networks;
	} else {
		return res
			.status(404)
			.json({ msg: `target ${req.params.target} Not Found` });
	}

	res.json(response);
});

export default router;
