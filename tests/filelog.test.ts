import chalk from "chalk";
import { createLogger, Logger, shimLog, fileLogger } from "../src";
import fs from 'fs';
import path from 'path'

function checkFileExists(file: any) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}
const logFn = jest.fn();

it('writes to an outside file', () => {
    fileLogger('test')("testing 123 \n Hello There! \n");
    expect(checkFileExists('_test.txt')).toBeTruthy();

})
