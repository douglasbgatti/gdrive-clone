import fs from "fs";
import prettyBytes from "pretty-bytes";

export default class FileHelper {
  static async getFilesStatus(downloadsFolder) {
    const owner = process.env.USER;

    const currentFiles = await fs.promises.readdir(downloadsFolder);
    const statuses = await Promise.all(
      currentFiles.map(async (file) => {
        const status = await fs.promises.stat(`${downloadsFolder}/${file}`);
        const { birthtime, size } = status;

        return {
          lastModified: birthtime,
          size: prettyBytes(size),
          file,
          owner,
        };
      })
    );

    return statuses;
  }
}
