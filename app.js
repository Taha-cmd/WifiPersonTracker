const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const app = express();
const fileUpload = require("express-fileupload");
const CsvParser = require("./CsvParser.js");
const port = process.env.PORT || 8080;

app.use(express.json()); // to parse json requests
app.use(express.text()); // to accept requests with content-type: text/plain
app.use(express.urlencoded({ extended: true })); // to parse incoming input

app.use(
	fileUpload({
		limits: { fileSize: 5 * 1024 * 1024 },
	})
);

app.use(express.query()); // to parse query parameters
app.get("/", (req, res) => res.send("Hello World!"));

let currentFile;

app.post("/data", (req, res) => {
	const file = req.files.data;
	const newPath = path.join(__dirname, "upload", uuidv4() + ".csv");

	file.mv(newPath, (err) => {
		res.status(500).send(err);
	});

	currentFile = newPath;
	data = res.send("thanks");
});

app.get("/data", (req, res) => {
	if (currentFile) {
		const parser = new CsvParser(currentFile, ",");
		const networkRecords = parser.getNetworks();
		const clientRecords = parser.getClients();

		//res.json({ clients: clientRecords, networks: networkRecords });
		res.json({ clients: clientRecords });
		return;
	}

	res.send("no data available");
});

app.listen(port);
