export class NetworkRecord {
	private BSSID: string;
	private firstTimeSeen: string;
	private lastTimeSeen: string;
	private channel: string;
	private speed: string;
	private privacy: string;
	private cipher: string;
	private authentication: string;
	private power: string;
	private beacons: string;
	private IV: string;
	private IP: string;
	private IDLength: string;
	private ESSID: string;
	private key: string;

	constructor(
		BSSID: string = "",
		firstTimeSeen: string = "",
		lastTimeSeen: string = "",
		channel: string = "",
		speed: string = "",
		privacy: string = "",
		cipher: string = "",
		authentication: string = "",
		power: string = "",
		beacons: string = "",
		IV: string = "",
		IP: string = "",
		IDLength: string = "",
		ESSID: string = "",
		key: string = ""
	) {
		this.BSSID = BSSID;
		this.firstTimeSeen = firstTimeSeen;
		this.lastTimeSeen = lastTimeSeen;
		this.channel = channel;
		this.speed = speed;
		this.privacy = privacy;
		this.cipher = cipher;
		this.authentication = authentication;
		this.power = power;
		this.beacons = beacons;
		this.IV = IV;
		this.IP = IP;
		this.IDLength = IDLength;
		this.ESSID = ESSID;
		this.key = key;
	}
}
