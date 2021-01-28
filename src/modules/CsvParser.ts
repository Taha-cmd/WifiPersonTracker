"use strict";

import { readFileSync, existsSync } from "fs";
import { EOL } from "os";
import { ClientRecord } from "../records/client.record";
import { NetworkRecord } from "../records/network.record";
import { IParsedAiroDumpFile } from "../interfaces/IParsedAiroDumpFile";

/*
airodump csv files have the following format:
1 empty line
networks header (15 keys)
networks
1 empty line
clients header (7 keys)
clients
empty line(s)
*/
export function parseAiroDumpFile(filePath: string): IParsedAiroDumpFile {
	if (!existsSync(filePath)) throw `file ${filePath} does not exist`;

	// read file as a string
	// split the file into lines, trim all to avoid white space problems
	const lines: string[] = readFileSync(filePath, { encoding: "utf8" })
		.split(EOL)
		.map((line) => line.trim());

	//IMPORTANT: sometimes the empty line is an empty string => ""
	//			 sometimes it is a white space => " "
	// therefore, trim all lines

	const newlineIndex = lines.indexOf("", 1); // get the index of the empty line, returns the first match
	const [networks, clients] = [
		lines.slice(2, newlineIndex).filter((line) => line !== ""), // first part are the networks/hosts. skip empty line and header (begin at 2)
		lines.slice(newlineIndex + 2).filter((line) => line !== ""), // second part are the clients, skip empty line and header (+2)
	];

	// map each network record as a string to network record class object
	// ... spread operator => spreads the elements of the array
	// map each string to its trimmed string
	return {
		networks: networks.map(
			(network: string) =>
				new NetworkRecord(...network.split(",").map((el: string) => el.trim()))
		),
		clients: clients.map(
			(client: string) =>
				new ClientRecord(...client.split(",").map((el: string) => el.trim()))
		),
	};
}
