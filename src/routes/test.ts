"use strict";
import express, { Request, Response } from "express";
import { join } from "path";

import { parseAiroDumpFile } from "../modules/CsvParser";
import { randomFile } from "../modules/util";
import { IResponse } from "../interfaces/IResponse";
import { IParsedAiroDumpFile } from "../interfaces/IParsedAiroDumpFile";

const testFilesPath = join(__dirname, "..", "..", "test");
const router = express.Router();

router.get("/:target?", (req: Request, res: Response) => {
	const parsedFile: IParsedAiroDumpFile = parseAiroDumpFile(
		randomFile(testFilesPath)
	);

	const response: IResponse = {
		msg: "here you go",
		timeOfScan: new Date(),
		data: { networks: [], clients: [] },
	};

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
