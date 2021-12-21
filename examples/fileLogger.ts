import { join } from 'path';

import { fileLogger } from '../src/FileLog';

fileLogger({ 
    mode: 'NEW_FILE', 
    path: join(__dirname, 'logs'), 
    namePattern: 'test.txt' })('Input to write to file');