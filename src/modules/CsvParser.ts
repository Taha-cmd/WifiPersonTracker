"use strict";

import { readFileSync } from "fs";
import { EOL } from "os";
import { ClientRecord } from "../records/client.record";
import { NetworkRecord } from "../records/network.record";

export class CsvParser {
	private delimiter: string;
	private networks: string[];
	private clients: string[];

	constructor(path: string, delimiter: string = ",") {
		const data: string = readFileSync(path, { encoding: "utf8" }); // read file as a string
		this.delimiter = delimiter;

		//IMPORTANT: sometimes the empty line is an empty string => ""
		//			 sometimes it is a white space => " "
		// therefore, trim all lines
		const lines = data.split(EOL).map((line) => line.trim()); // split the file into lines
		const newlineIndex = lines.indexOf("", 1); // get the index of the empty line, returns the first match
		const [networks, clients] = [
			lines.slice(2, newlineIndex), // first part are the networks/hosts. skip empty line and header (begin at 2)
			lines.slice(newlineIndex + 2), // second part are the clients, skip empty line and header (+2)
		];

		this.networks = networks.filter((line) => line != "");
		this.clients = clients.filter((line) => line != "");
	}

	// map each network record as a string to network record class object
	// ... spread operator => spreads the elements of the array
	// map each string to its trimmed string
	getClients(): ClientRecord[] {
		return this.clients.map(
			(client: string) =>
				new ClientRecord(
					...client.split(this.delimiter).map((el: string) => el.trim())
				)
		);
	}

	getNetworks(): NetworkRecord[] {
		return this.networks.map(
			(network: string) =>
				new NetworkRecord(
					...network.split(this.delimiter).map((el: string) => el.trim())
				)
		);
	}
}
