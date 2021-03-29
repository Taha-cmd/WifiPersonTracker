export class ClientRecord {
	public MAC: string;
	private firstTimeSeen: string;
	private lastTimeSeen: string;
	private power: string;
	private packets: string;
	private BSSID: string;
	private probes: string;
	private distance_2comma4ghz: number;
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

		this.distance_2comma4ghz = Math.pow(
			10,
			(27.55 - 20 * Math.log10(2400) + Math.abs(+power)) / 20
		);
		this.distance_5ghz = Math.pow(
			10,
			(27.55 - 20 * Math.log10(5000) + Math.abs(+power)) / 20
		);
	}
}
