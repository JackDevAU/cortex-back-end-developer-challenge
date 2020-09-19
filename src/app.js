import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import logger from "morgan";

import characterRoutes from "./routes/characters.js";
import { logErrors, clientError, serverError } from "./errorlog.js";

import "./mongodb/provider.js";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use("/characters", characterRoutes);

app.use(logErrors);
app.use(clientError);
app.use(serverError);

app.get("/", (req, res) => res.send("Welcome to a API? maybe? "));

var server = app.listen(process.env.PORT || 3000, () =>
  console.log(`Starting Server on http://localhost:${server.address().port}`)
);
