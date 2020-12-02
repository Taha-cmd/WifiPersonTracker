const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello World!"));

app.use(express.json()); // to parse json requests
app.use(express.text()); // to accept requests with content-type: text/plain
app.use(express.urlencoded({ extended: true })); // to parse incoming input

const data = [];

app.post("/data", (req, res) => {
	data.push(req.body);
	res.send(data);
});

app.get("/data", (req, res) => {
	res.send(data);
});

app.listen(port);
