"use strict";

import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import fileUpload from "express-fileupload";

// import routes
import { default as dataRouter } from "./routes/data";
import { default as testRouter } from "./routes/test";

const port = process.env.PORT || 8080;
const app: Application = express();

app.use(express.json()); // to parse json requests
app.use(express.text()); // to accept requests with content-type: text/plain
app.use(express.urlencoded({ extended: true })); // to parse incoming input
//app.use(express.query()); // to parse query parameters

// allow only 5 mb
app.use(
	fileUpload({
		limits: { fileSize: 5 * 1024 * 1024 },
		abortOnLimit: true
	})
);

// allow request from everyone
app.get("/*", (_, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Host", "yaw boi");
	next();
});

app.get("/", (_: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "..", "api.html"));
});

app.use("/test", testRouter);
app.use("/data", dataRouter);

const arr = ["hola", "boy"];

app.listen(port);
