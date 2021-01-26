class ClientRecord {
	constructor(MAC, firstTimeSeen, lastTimeSeen, power, packets, BSSID, probes) {
		this.MAC = MAC;
		this.firstTimeSeen = firstTimeSeen;
		this.lastTimeSeen = lastTimeSeen;
		this.power = power;
		this.packets = packets;
		this.BSSID = BSSID;
		this.probes = probes;
	}
}

module.exports = ClientRecord;
