import fs from 'fs';

import { FileLogger } from '../src/file-log';

describe('Raw Execution', () => {
    it('writes to an outside file', async () => {
        FileLogger({
            mode: 'NEW_FILE',
            namePattern: 'test', //'dd-mm-yyyy',
            path: 'logs/1',
        })('testing 123\nHello There!\n');

        setTimeout(async () => {
            expect(await fs.promises.readFile('logs/1/test', 'utf-8')).toEqual(
                'testing 123\nHello There!\n\n'
            );
        }, 0);
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

        setTimeout(async () => {
            expect(await fs.promises.readFile('logs/2/test', 'utf-8'));
        }, 0);
    });
});
