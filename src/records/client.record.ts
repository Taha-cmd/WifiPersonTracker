export class ClientRecord {
	private MAC: string;
	private firstTimeSeen: string;
	private lastTimeSeen: string;
	private power: string;
	private packets: string;
	private BSSID: string;
	private probes: string;

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
	}
}
