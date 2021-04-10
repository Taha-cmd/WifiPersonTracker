import { calculateDistance } from "../modules/util";

export class ClientRecord {
	public MAC: string;
	private firstTimeSeen: string;
	private lastTimeSeen: string;
	private power: string;
	private packets: string;
	private BSSID: string;
	private probes: string;
	private distance_2_4ghz: number;
	private distance_5ghz: number;

	constructor(
		MAC: string = "",
		firstTimeSeen: string = "",
		lastTimeSeen: string = "",
		power: string = "",
		packets: string = "",
		BSSID: string = "",
		probes: string = ""
	) {
		this.MAC = MAC;
		this.firstTimeSeen = firstTimeSeen;
		this.lastTimeSeen = lastTimeSeen;
		this.power = power;
		this.packets = packets;
		this.BSSID = BSSID;
		this.probes = probes;

		this.distance_2_4ghz = calculateDistance(2400, +power);
		this.distance_5ghz = calculateDistance(5000, +power);
	}
}
