"use strict";

const fs = require("fs");
const { EOL } = require("os");
const ClientRecord = require("../records/client.record");
const NetworkRecord = require("../records/network.record");

class CsvParser {
	constructor(path, delimiter = ",") {
		this.data = fs.readFileSync(path, { encoding: "utf8" }); // read file a string
		this.delimiter = delimiter;

		const lines = this.data.split(EOL); // split the file into lines
		const newlineIndex = lines.indexOf(" "); // get the index of the empty line

		[this.networks, this.clients] = [
			lines.slice(1, newlineIndex), // first part are the networks/hosts. skip header (begin at 1)
			lines.slice(newlineIndex + 2), // second part are the clients, skip empty line and header (+2)
		];
	}

	// map each network record as a string to network record class object
	// ... spread operator => spreads the elements of the array
	// map each string to its trimmed string
	getClients() {
		return this.clients.map(
			(client) =>
				new ClientRecord(...client.split(this.delimiter).map((el) => el.trim()))
		);
	}

	getNetworks() {
		return this.networks.map(
			(network) =>
				new NetworkRecord(
					...network.split(this.delimiter).map((el) => el.trim())
				)
		);
	}
}

module.exports = CsvParser;
