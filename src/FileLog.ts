import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

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

export const fileLogger = (config: FileLoggerConfig) => {
    let path = config.path;

    // If we are creating a new file generate the file name
    if (config.mode == 'NEW_FILE') {
        let calculatedPattern = config.namePattern;

        path = join(config.path, calculatedPattern);
    }

    // Ensure the parent folder exists
    const folder = resolve(path, '..');
    if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
    }

    // Create the stream to write out to
    const stream = createWriteStream(path, {
        encoding: 'utf-8',
        autoClose: true,
    });

    // Return the executable logging function
    return (input: string) => {
        stream.write(input + '\n');
    };
};
