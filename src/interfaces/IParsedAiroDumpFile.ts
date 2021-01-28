import { NetworkRecord } from "../records/network.record";
import { ClientRecord } from "../records/client.record";

export interface IParsedAiroDumpFile {
	clients: ClientRecord[];
	networks: NetworkRecord[];
}
