class NetworkRecord {
	constructor(
		BSSID,
		firstTimeSeen,
		lastTimeSeen,
		channel,
		speed,
		privacy,
		cipher,
		authentication,
		power,
		beacons,
		IV,
		LAN,
		IP,
		IDLength,
		ESSID,
		key
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
		this.ESSID = ESSID;
		this.key = key;
	}
}

module.exports = NetworkRecord;
