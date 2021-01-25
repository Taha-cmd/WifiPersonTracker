"use strict";

const express = require("express");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 8080;

app.use(express.json()); // to parse json requests
app.use(express.text()); // to accept requests with content-type: text/plain
app.use(express.urlencoded({ extended: true })); // to parse incoming input
app.use(express.query()); // to parse query parameters

// allow only 5 mb
app.use(
	fileUpload({
		limits: { fileSize: 5 * 1024 * 1024 },
		abortOnLimit: true,
	})
);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "api.html"));
});

// import routes
app.use("/test", require(path.join(__dirname, "routes", "test.js")));
app.use("/data", require(path.join(__dirname, "routes", "data.js")));

app.listen(port);


/*const {join} = require("path");
const CsvParser = require(join(__dirname, "modules", "CsvParser.js"));

const testFile = join(__dirname, "test", "2.csv");
const parser = new CsvParser(testFile);
console.log(parser.getClients()); */
