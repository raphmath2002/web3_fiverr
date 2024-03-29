import express from "express";
import config from "config";
import log from "./logger";
import routes from "./routes";
import axios from 'axios';
import cors from 'cors';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors())

app.listen(port, host,   () => {
  log.info(`Gateway started at http://${host}:${port}`);

  for (const service of ['jobsService', 'usersService']) {
    axios.get(`${config.get(service)}/alive`)
      .then(() => log.info(`${service} is alive !`))
      .catch(() => log.error(`${service} is not alive !`));
  }

  routes(app);
});