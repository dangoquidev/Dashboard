import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apiRouter from "./router";

dotenv.config();

const app = express();
const router = express.Router();

router.use("/api", apiRouter);

app.use(
	cors({
		origin: "http://localhost:8081",
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);

app.use(router);

const server = http.createServer(app);

server.listen(8080, () => {
	console.log("Server running on http://localhost:8080");
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", (error: Error) => {
	console.error(error);
});
