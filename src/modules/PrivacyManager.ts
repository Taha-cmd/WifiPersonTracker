import { uuid } from "uuidv4";
import { ClientRecord } from "../records/client.record";

const macAddressUuidDictionary: Map<string, string> = new Map<string, string>();

export function maskMacAddresses(clients: ClientRecord[]): ClientRecord[] {
	// create new uuids for new clients
	clients
		.filter((client) => !macAddressUuidDictionary.has(client.MAC))
		.forEach((client) => macAddressUuidDictionary.set(client.MAC, uuid()));

	// remove old clients
	macAddressUuidDictionary.forEach((_, key) => {
		if (!clients.some((client) => client.MAC == key)) {
			macAddressUuidDictionary.delete(key);
		}
	});

	// replace mac addresses from the new array
	clients.forEach((_, index) => {
		clients[index]!.MAC = <string>(
			macAddressUuidDictionary.get(clients[index]!.MAC)
		);
	});

	// ! null assertion operator, tells the compiler that the variable is definitely not null

	// return the new clients list
	return clients;
}
