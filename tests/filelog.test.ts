import fs from 'fs';

import { FileLogger } from '../src/FileLog';

describe('Raw Execution', () => {
    it('writes to an outside file', async () => {
        FileLogger({
            mode: 'NEW_FILE',
            namePattern: 'test', //'dd-mm-yyyy',
            path: 'logs/1',
        })('testing 123\nHello There!\n');

        setImmediate(async () => {
            expect(await fs.promises.readFile('logs/1/test', 'utf-8')).toEqual(
                'testing 123\nHello There!\n\n'
            );
        });
    });
});

describe('FS Creation', () => {
    beforeEach(async () => {
        if (fs.existsSync('logs/2')) {
            await fs.promises.rm('logs/2', { recursive: true });
        }
    });

    it('creates the folder if not exists', async () => {
        FileLogger({
            mode: 'NEW_FILE',
            namePattern: 'test',
            path: 'logs/2',
        })('');

        setImmediate(async () => {
            expect(await fs.promises.readFile('logs/2/test', 'utf-8'));
        });
    });
});
