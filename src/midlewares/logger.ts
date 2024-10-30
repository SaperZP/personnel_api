import logger from 'morgan';
import {MODE} from "../config/environment";
import * as fs from "node:fs";
import * as path from "node:path";

const logDirectory = path.resolve('./logs');
const today = new Date().toISOString().split('T')[0];

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const log = MODE === 'dev' ?
    logger('dev') : logger('combined', {
      stream: fs.createWriteStream(path.join(logDirectory, `${today}.log`), {flags: 'a+'}),
    });

export default log;
