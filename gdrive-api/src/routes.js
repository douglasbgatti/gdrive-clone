import { logger } from "./logger.js";

export default class Routes {
  io;

  constructor() {}

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(req, res) {
    res.end("Default Route");
  }

  async options(req, res) {
    res.writeHead(204);
    res.end("options");
  }

  async post(req, res) {
    logger.info("Routes.post");
    res.end();
  }

  async get(req, res) {
    logger.info("Routes.get");
    res.end();
  }

  async handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    logger.info("Routes/Handler");

    const method = this[req.method.toLowerCase()] || this.defaultRoute;

    return method.apply(this, [req, res]);
  }
}
