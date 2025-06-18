import { HttpException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: File) {
    try {
      const filename = uuid.v4() + path.extname(file.name);

      const dirPath = path.join(__dirname, '..', 'static');

      const filePath = path.join(dirPath, filename);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, new Buffer(await file.arrayBuffer()));

      return filename;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async writeContent(message: string, filename: string) {
    try {
      const dirPath = path.join(__dirname, '..', 'static');

      const filePath = path.join(dirPath, filename);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, message);

      console.log(filePath);

      return filename;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async readContent(filename: string) {
    const dirPath = path.join(__dirname, '..', 'static');

    const filePath = path.join(dirPath, filename);

    return fs.readFileSync(filePath).toString();
  }
}
