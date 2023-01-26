import fs from 'fs';
import path from 'path';

import { stripAnsi } from './ansi';

export type FileLoggerConfig = FileLoggerConfigNew | FileLoggerConfigAppend;

type FileLoggerConfigNew = {
    mode: 'NEW_FILE';
    path: string;
    namePattern: string;
};

type FileLoggerConfigAppend = {
    mode: 'APPEND_FILE';
    path: string;
};

export const FileLogger = (config: FileLoggerConfig) => {
    let { path: filePath } = config;
    const { mode } = config;

    // If we are creating a new file generate the file name
    if (mode == 'NEW_FILE') {
        const { namePattern } = config;
        const calculatedPattern = namePattern;

        filePath = path.join(filePath, calculatedPattern);
    }

    // Ensure the parent folder exists
    const folder = path.resolve(filePath, '..');

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    // Create the stream to write out to
    const stream = fs.createWriteStream(filePath, {
        encoding: 'utf-8',
        autoClose: true,
    });

    // Return the executable logging function
    return (input: string) => {
        stream.write(stripAnsi(input) + '\n');
    };
};
