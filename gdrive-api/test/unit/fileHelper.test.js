import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import FileHelper from "../../src/helpers/fileHelper";

describe("#fileHelper tests", () => {
  describe("#getFileStatus", () => {
    test("it should sjould return files statuses correct status", async () => {
      const statMock = {
        dev: 66306,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 10936688,
        size: 252214,
        blocks: 496,
        atimeMs: 1630967147539.5894,
        mtimeMs: 1630967145991.5996,
        ctimeMs: 1630967145991.5996,
        birthtimeMs: 1630967145991.5996,
        atime: "2021-09-06T22:25:47.540Z",
        mtime: "2021-09-06T22:25:45.992Z",
        ctime: "2021-09-06T22:25:45.992Z",
        birthtime: "2021-09-06T22:25:45.992Z",
      };

      const mockOwner = "douglasbgatti";
      process.env.USER = mockOwner;
      const fileName = "file_name.png";

      // mock fs.readdir function resolved value
      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([fileName]);

      // mock fs.stat function resolved value
      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          size: "252 kB",
          lastModified: statMock.birthtime,
          owner: mockOwner,
          file: fileName,
        },
      ];

      expect(fs.promises.stat).toHaveBeenLastCalledWith(`/tmp/${fileName}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
