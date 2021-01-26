"use strict";

import express, { Request, Response } from "express";
import path from  "path";
import fileUpload from "express-fileupload";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json()); // to parse json requests
app.use(express.text()); // to accept requests with content-type: text/plain
app.use(express.urlencoded({ extended: true })); // to parse incoming input
//app.use(express.query()); // to parse query parameters

// allow only 5 mb
app.use(
	fileUpload({
		limits: { fileSize: 5 * 1024 * 1024 },
		abortOnLimit: true,
	})
);

app.get("/", (_ : Request, res : Response) => {
	res.sendFile(path.join(__dirname, "api.html"));
});

// import routes
app.use("/test", require(path.join(__dirname, "routes", "test.js")));
app.use("/data", require(path.join(__dirname, "routes", "data.js")));

app.listen(port);
