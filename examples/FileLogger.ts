import { join } from 'path';
import { createLogger } from '@lvksh/logger';
import { FileLogger } from '@lvksh/logger/lib/FileLog';

const log = createLogger(
    {
        OK: 'OK',
        INFO: 'INFO'
    },
    { divider: ' | ' },
    FileLogger({
        mode: 'NEW_FILE',
        path: join(__dirname, 'logs'),
        namePattern: 'test.txt'
    })
);

log.ok('Hello World');