import chalk from 'chalk';

import { createLogger, Logger, shimLog } from '../src';

const logFunction = jest.fn();

describe('Basic Logging', () => {
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
            { padding: 'PREPEND', color: false },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log ok', () => {
        logger.ok(
            'This is the best logging library',
            'It\'s not even a question',
            'It even supports multi\nline logs'
        );
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This is the best logging library\n` +
            '  |  It\'s not even a question\n' +
            '  |  It even supports multi\n' +
            '  \\- line logs'
        );
    });
});
