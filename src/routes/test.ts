"use strict";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import { join } from "path";

import { CsvParser } from "../modules/CsvParser";
import { randomFile } from "../modules/util";
import { response } from "../interfaces/response";

const testFilesPath = join(__dirname, "..", "..", "test");
const router = express.Router();

router.use("/*", (_: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

router.get("/read", (_: Request, res: Response) => {
	const text = fs.readFileSync(join(__dirname, "..", "..", "test", "3.csv"), {
		encoding: "utf8",
	});
	res.header("Content-Type", "text/plain");
	res.send(text);
});

router.get("/:target?", (req: Request, res: Response) => {
	const parser: CsvParser = new CsvParser(randomFile(testFilesPath));
	const response: response = {
		msg: "here you go",
		timeOfScan: new Date(),
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

	res.json(response);
});

export default router;
