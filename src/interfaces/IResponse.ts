import { NetworkRecord } from "../records/network.record";
import { ClientRecord } from "../records/client.record";

export interface IResponse {
	msg: string;
	timeOfScan: Date;
	data: { networks: NetworkRecord[]; clients: ClientRecord[] };
}
