import { logger } from "./logger.js";
import FileHelper from "./helpers/fileHelper.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDownloadsFolder = resolve(__dirname, "../", "downloads");

export default class Routes {
  io;

  constructor(downloadsFolder = defaultDownloadsFolder) {
    this.downloadsFolder = downloadsFolder;
    this.fileHelper = FileHelper;
  }

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
    const filesStatuses = await this.fileHelper.getFilesStatus(
      this.downloadsFolder
    );

    res.writeHead(200);

    res.end(JSON.stringify(filesStatuses));
  }

  async handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    logger.info("Routes/Handler");

    const method = this[req.method.toLowerCase()] || this.defaultRoute;

    return method.apply(this, [req, res]);
  }
}
