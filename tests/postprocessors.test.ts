import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFunction = jest.fn();

describe('Post Process Logging', () => {
    let logger: Logger<'ok'>;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: {
                    label: chalk.greenBright`[OK]`,
                    newLine: '| ',
                    newLineEnd: '\\-',
                },
            },
            {
                padding: 'PREPEND',
                color: false,
                postProcessors: [
                    (method, lines) => {
                        let index = 0;

                        return lines.map(it => `[Called ${method} ${++index} times] ${it}`);
                    }
                ]
            },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log with pre-processor', () => {
        logger.ok(
            'This is the best logging library',
            'It\'s not even a question',
            'It even supports multi\nline logs'
        );
        expect(logFunction).toBeCalledWith(
            `[Called ok 1 times] ${chalk.greenBright('[OK]')} This is the best logging library\n` +
            '[Called ok 2 times]   |  It\'s not even a question\n' +
            '[Called ok 3 times]   |  It even supports multi\n' +
            '[Called ok 4 times]   \\- line logs'
        );
    });
});
